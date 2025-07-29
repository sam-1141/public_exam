<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ArchiveController extends Controller
{
    public function loadArchivePage()
    {
        return Inertia::render('Student/Archive/ArchivePage');
    }
}
