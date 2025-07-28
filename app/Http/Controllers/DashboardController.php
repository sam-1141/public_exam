<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Home');
    }

    public function about()
    {
        return Inertia::render('About');
    }
}
