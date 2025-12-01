<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChapterLectureController extends Controller
{
    public function getLectures($chapterName)
{
    $lectures = \App\Models\ChapterLecture::where('chapter', $chapterName)
        ->orderBy('lecture_number')
        ->get();

    return response()->json($lectures);
}

}
