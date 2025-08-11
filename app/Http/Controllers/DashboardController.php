<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
         if($user->role == 'admin') {
            return Inertia::render('Admin/Dashboard/Dashboard');
        }else {
            return Inertia::render('Student/Dashboard/Dashboard');
        }
    }

    public function about()
    {
        return Inertia::render('About');
    }


}
