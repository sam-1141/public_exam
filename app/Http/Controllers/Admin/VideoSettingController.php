<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hsc26MapRegistration;
use App\Models\VideoSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VideoSettingController extends Controller
{
    public function edit()
    {
        if (!Auth::check()) {
            return back()->with('error', 'You must be logged in.');
        }
        $user = auth()->user();
        if ($user->role == 'admin') {
            $setting = VideoSetting::latest('updated_at')->first();

            return Inertia::render('Admin/VideoSettingEdit', [
                'setting' => $setting
            ]);
        } else {
            return redirect()->route('auth.login');
        }
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        if ($user->role == 'admin') {
            $validated = $request->validate([
                'title' => 'nullable|string|max:255',
                'video_url' => 'required|url',
                'message' => 'nullable|string',
                'purchase_link' => 'nullable|url',
                'deadline' => 'nullable|date',
                'exam_description_bn' => 'nullable|string',
                'exam_url' => 'nullable|url',
            ]);

            $setting = VideoSetting::latest('updated_at')->first();

            if ($setting) {
                $setting->update($validated);
            } else {
                VideoSetting::create($validated);
            }

            return back()->with('success', 'Video settings updated successfully!');
        } else {
            return redirect()->route('auth.login');
        }
    }

    public function showStudentDashboard()
    {
        $user = auth()->user();
        if ($user->role == 'admin') {
            $totalStudents = Hsc26MapRegistration::count();

            $earliestRegistration = Hsc26MapRegistration::orderBy('created_at', 'asc')->first();
            $latestRegistration = Hsc26MapRegistration::orderBy('created_at', 'desc')->first();

            $collegeWise = Hsc26MapRegistration::select('eiin', 'college')
                ->selectRaw('COUNT(*) as total')
                ->groupBy('eiin', 'college')
                ->orderBy('total', 'desc')
                ->get()
                ->map(function ($item) {
                    return [
                        'eiin' => $item->eiin,
                        'name' => $item->eiin === '000000' ? 'Unlisted Colleges' : $item->college,
                        'total' => $item->total
                    ];
                });

            // Count unique colleges except 000000
            $uniqueColleges = Hsc26MapRegistration::where('eiin', '!=', '000000')
                ->distinct('eiin')
                ->count();

            return Inertia::render('Student/Registration_StudentDashboard', [
                'stats' => [
                    'total_students' => $totalStudents,
                    'earliest_registration' => $earliestRegistration?->created_at,
                    'latest_registration' => $latestRegistration?->created_at,
                    'unique_colleges' => $uniqueColleges
                ],
                'collegeWise' => $collegeWise,
            ]);
        } else {
            return redirect()->route('auth.login');
        }
    }
}
