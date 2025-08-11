<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if($user->role == 'student') {
            return Inertia::render('Student/Dashboard/Dashboard');
        } elseif($user->role == 'admin') {
            return Inertia::render('Admin/Dashboard/Dashboard');
        }
        return Inertia::render('Admin/Dashboard/Dashboard');
    }

//    public function studentDashboard()
//    {
//        return Inertia::render('Student/Dashboard/Dashboard');
//    }

    public function about()
    {
        return Inertia::render('About');
    }


}
