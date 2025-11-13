<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

/**
 * ContactController
 *
 * Handles contact form submissions from both home page CTA and contact page.
 * Includes bot-resistant CAPTCHA validation.
 */
class ContactController extends Controller
{
    /**
     * Generate a new CAPTCHA challenge.
     * Returns JSON with question and encrypted answer.
     * Uses HMAC to ensure token integrity.
     */
    public function generateCaptcha()
    {
        // Generate two random numbers between 5 and 20
        $num1 = rand(5, 20);
        $num2 = rand(5, 20);

        // Randomly choose an operation (addition or subtraction)
        $operations = ['+', '-'];
        $operation = $operations[array_rand($operations)];

        // Calculate the answer
        if ($operation === '+') {
            $answer = $num1 + $num2;
        } else {
            // Ensure result is positive
            if ($num1 < $num2) {
                $temp = $num1;
                $num1 = $num2;
                $num2 = $temp;
            }
            $answer = $num1 - $num2;
        }

        // Create the question
        $question = "{$num1} {$operation} {$num2}";

        // Create a token that includes the answer, timestamp, and a random salt
        // This way we don't rely on session matching
        $timestamp = time();
        $salt = rand(1000, 9999);
        $data = "{$answer}_{$timestamp}_{$salt}";

        // Encrypt the data with HMAC for integrity
        $secret = config('app.key'); // Use Laravel's app key
        $hmac = hash_hmac('sha256', $data, $secret);
        $token = base64_encode($data . '_' . $hmac);

        // Also store in session as backup (for 5 minutes)
        Session::put('captcha_' . md5($token), [
            'answer' => $answer,
            'time' => $timestamp,
        ]);

        // Return question and a token
        return response()->json([
            'question' => $question,
            'token' => $token,
        ]);
    }

    /**
     * Verify CAPTCHA answer.
     * Uses token-based verification with HMAC for security.
     */
    protected function verifyCaptcha($userAnswer, $token)
    {
        if (empty($token)) {
            \Log::warning('CAPTCHA token is empty');
            return false;
        }

        // Decode the token
        $decoded = base64_decode($token);
        if ($decoded === false) {
            \Log::error('Failed to decode CAPTCHA token');
            return false;
        }

        // Split data and HMAC
        $parts = explode('_', $decoded);
        if (count($parts) < 4) {
            \Log::error('Invalid CAPTCHA token format - not enough parts');
            return false;
        }

        // Extract HMAC (last part)
        $hmac = array_pop($parts);
        $data = implode('_', $parts);

        // Verify HMAC
        $secret = config('app.key');
        $expectedHmac = hash_hmac('sha256', $data, $secret);

        if (!hash_equals($expectedHmac, $hmac)) {
            \Log::warning('CAPTCHA HMAC verification failed - token may be tampered');
            return false;
        }

        // Extract answer, timestamp, and salt
        $dataParts = explode('_', $data);
        if (count($dataParts) < 3) {
            \Log::error('Invalid CAPTCHA data format');
            return false;
        }

        $correctAnswer = (int)$dataParts[0];
        $timestamp = (int)$dataParts[1];
        $salt = $dataParts[2];

        // Check if CAPTCHA is not expired (5 minutes)
        if ((time() - $timestamp) > 300) {
            \Log::warning('CAPTCHA expired', [
                'timestamp' => $timestamp,
                'current_time' => time(),
                'age' => time() - $timestamp,
            ]);
            return false;
        }

        // Verify answer
        $userAnswerInt = (int)$userAnswer;
        $isValid = $userAnswerInt === $correctAnswer;

        // Log for debugging
        \Log::info('CAPTCHA Verification', [
            'correct_answer' => $correctAnswer,
            'user_answer' => $userAnswerInt,
            'match' => $isValid,
            'timestamp' => $timestamp,
            'age_seconds' => time() - $timestamp,
        ]);

        // Clear session backup if exists
        $sessionKey = 'captcha_' . md5($token);
        if (Session::has($sessionKey)) {
            Session::forget($sessionKey);
        }

        return $isValid;
    }

    /**
     * Handle contact form submission.
     */
    public function submit(Request $request)
    {
        // Log incoming request data for debugging
        \Log::info('Contact form submission received', [
            'captcha_answer' => $request->input('captcha_answer'),
            'captcha_token' => $request->input('captcha_token') ? substr($request->input('captcha_token'), 0, 20) . '...' : 'missing',
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'all_data' => $request->except(['_token', 'captcha_token']), // Log all except token for security
        ]);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:2000',
            'captcha_answer' => 'required|integer',
            'captcha_token' => 'required|string',
        ], [
            'name.required' => 'Please enter your name.',
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'message.required' => 'Please enter your message.',
            'captcha_answer.required' => 'Please solve the CAPTCHA.',
            'captcha_token.required' => 'CAPTCHA token is missing.',
        ]);

        if ($validator->fails()) {
            return back()
                ->withErrors($validator)
                ->withInput()
                ->with('error', 'Please correct the errors below.');
        }

        // Verify CAPTCHA
        if (!$this->verifyCaptcha($request->captcha_answer, $request->captcha_token)) {
            return back()
                ->withErrors(['captcha_answer' => 'CAPTCHA verification failed. Please try again.'])
                ->withInput()
                ->with('error', 'CAPTCHA verification failed. Please solve the CAPTCHA again.');
        }

        // Additional bot protection: Check for suspicious patterns
        $suspiciousPatterns = [
            '/http[s]?:\/\//i', // URLs
            '/www\./i',
            '/\[url\]/i',
            '/<a\s+href/i', // HTML links
        ];

        $message = $request->message;
        foreach ($suspiciousPatterns as $pattern) {
            if (preg_match($pattern, $message)) {
                // Allow URLs but log for review
                // You might want to be more strict here
            }
        }

        // Store message in database
        $contactMessage = \App\Models\ContactMessage::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'company' => $request->company,
            'subject' => $request->subject,
            'message' => $request->message,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        // Send email notification
        try {
            Mail::raw(
                "New Contact Form Submission\n\n" .
                "Name: {$request->name}\n" .
                "Email: {$request->email}\n" .
                "Phone: " . ($request->phone ?? 'N/A') . "\n" .
                "Company: " . ($request->company ?? 'N/A') . "\n" .
                "Subject: " . ($request->subject ?? 'N/A') . "\n\n" .
                "Message:\n{$request->message}",
                function ($message) use ($request) {
                    $message->to(config('mail.from.address'))
                        ->subject('New Contact Form Submission: ' . ($request->subject ?? 'No Subject'));
                }
            );
        } catch (\Exception $e) {
            // Log error but don't fail the request
            \Log::error('Contact form email failed: ' . $e->getMessage());
        }

        // Return success message - Inertia will handle this
        if ($request->wantsJson() || $request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Thank you for your message! We will get back to you within 24 hours.',
            ]);
        }

        return back()->with('success', 'Thank you for your message! We will get back to you within 24 hours.');
    }
}

