<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeamMember;

/**
 * TeamMemberSeeder
 * 
 * Seeds the team_members table with initial team member data.
 * Includes the three key team members: Chairman, CEO & Founder, and Co-founder & MD.
 */
class TeamMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        TeamMember::query()->delete();

        // Create team members
        $teamMembers = [
            [
                'name' => 'Adonu Celestine, Ph.D',
                'title' => 'Chairman',
                'bio' => 'Leading the strategic vision and governance of Jiftek with extensive experience in technology and business leadership.',
                'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Ifeanyi Odo',
                'title' => 'CEO & Founder',
                'bio' => 'Founder and Chief Executive Officer, driving innovation and growth across all aspects of Jiftek\'s operations.',
                'image' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Oluchukwu Eya',
                'title' => 'Co-founder & MD',
                'bio' => 'Co-founder and Managing Director, overseeing day-to-day operations and ensuring excellence in service delivery.',
                'image' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($teamMembers as $member) {
            TeamMember::create($member);
        }
    }
}
