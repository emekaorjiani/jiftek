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


   public function about()
   {
    return Inertia::render('about/page');
   }

   public function solutions()
   {
    return Inertia::render('solutions/page');
   }

   public function services()
   {
    return Inertia::render('services/page');
   }

   public function insights()
   {
    return Inertia::render('insights/page');
   }

   public function contact()
   {
    return Inertia::render('contact/page');
   }
}
