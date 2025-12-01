<?php

namespace App\Http\Controllers\Student;

use App\Models\VideoSetting;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function show()
    {
        // Fetch the most recently updated video setting
        $latestSetting = VideoSetting::latest('updated_at')->first();

        return Inertia::render('Student/Hsc26Video', [
            'videoUrl' => $latestSetting?->video_url,
            'title' => $latestSetting?->title,
            'message' => $latestSetting?->message,
            'purchase_link' => $latestSetting?->purchase_link,
        ]);
    }
}
