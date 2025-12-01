<?php

namespace App\Http\Controllers;

use App\Models\ChapterLecture;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AdminLectureController extends Controller
{
    public function index()
    {
        if (Auth::user()->email !== 'admin@example.com') {
            abort(403, 'Unauthorized');
        }

        $lectures = ChapterLecture::all();
        return Inertia::render('AdminLectures', ['lectures' => $lectures]);
    }

    public function store(Request $request)
    {
        if (Auth::user()->email !== 'admin@example.com') {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'chapter' => 'required|string',
            'lecture_number' => 'required|integer',
            'lecture_link' => 'required|url',
        ]);

        ChapterLecture::updateOrCreate(
    [
        'chapter' => $request->chapter,          // 🔹 fields to check for existing record
        'lecture_number' => $request->lecture_number,
    ],
    [
        'lecture_link' => $request->lecture_link, // 🔹 fields to update if found or create
    ]
);

        return redirect()->back()->with('success', 'Lecture added successfully');
    }
}
