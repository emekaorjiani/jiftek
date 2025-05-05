<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontPagesController extends Controller
{
   public function index()
   {
    return Inertia::render('index');
   }

   public function solution()
   {
    return Inertia::render('solution/page');
   }

   public function service()
   {
    return Inertia::render('services/page');
   }

   public function about()
   {
    return Inertia::render('about/page');
   }

   public function insight()
   {
    return Inertia::render('insights/page');
   }

   public function contact()
   {
    return Inertia::render('contact/page');
   }
}
