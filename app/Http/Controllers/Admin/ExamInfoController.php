<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VideoSetting;
use Inertia\Inertia;

class ExamInfoController extends Controller
{
    public function show()
    {
        // Get only the latest record with two columns
        $exam = VideoSetting::select('exam_description_bn', 'exam_url')
            ->latest('updated_at')
            ->first();

        return Inertia::render('Admin/ExamInfo', [
            'exam' => $exam,
        ]);
    }
}
