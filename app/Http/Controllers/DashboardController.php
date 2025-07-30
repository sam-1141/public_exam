<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard/Dashboard');
    }

    public function about()
    {
        return Inertia::render('About');
    }

    public function studentDashboard()
    {
        return Inertia::render('Student/Dashboard/Dashboard');
    }
}
