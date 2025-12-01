<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\AdminLectureController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Student\Hsc26MapRegistrationController;
use App\Http\Controllers\Student\VideoController;
use App\Http\Controllers\Admin\ExamInfoController;
use App\Http\Controllers\Admin\LiveExamController;
use \App\Http\Controllers\Admin\VideoSettingController;
use App\Http\Controllers\Student\StudentLiveExamController;



##############################################################################################################################################################


Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->controller(VideoSettingController::class)
    ->group(function () {

        Route::controller(LiveExamController::class)->group(function () {
            Route::post('/live-exam/store', 'store')->name('live-exams.store');
            Route::get('/live-exams/create', 'create')->name('admin.live-exams.create');
            Route::get('/admin/live-exams/{slug}', 'getSingleExam')->name('get.single.exam');
            Route::put('/admin/live-exams/{slug}', 'updateExam')->name('update.single.exam');
            Route::post('/admin/live-exams/questions', 'storeExamQuestion')->name('admin.exam.questions.store');
            Route::put('/admin/live-exams/questions/{id}/update', 'updateExamQuestion')->name('admin.exam.questions.update');
            Route::delete('/admin/live-exam/questions/{id}', 'destroyExamQuestion')->name('admin.exam.questions.destroy');
            Route::put('/exams/{id}/toggle-status', 'toggleExamStatus')->name('exams.status.toggle');
            Route::put('/exams/{id}/toggle-exam-type', 'toggleExamType')->name('exams.type.toggle');
            Route::get('/add-exam', 'loadAddExamPage')->name('admin.add.exam');
            Route::get('/add-exam/live-exam', 'loadAddLiveExamPage')->name('admin.add.live.exam');
//            Route::post('/add-exam/live-exam', 'loadAddLiveExamPage')->name('admin.add.live.exam');
            Route::get('/exams', 'loadViewExamDetails')->name('admin.exam.details');
            Route::post('/live-exam/reorder-questions', 'reorderQuestions')->name('live.exam.reorder.questions');
        });
        

    });
use App\Http\Controllers\Admin\InvigilatorController;

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/invigilator', [InvigilatorController::class, 'index']);
    Route::post('/admin/toggle-login/{id}', [InvigilatorController::class, 'toggleLogin']);
    Route::post('/admin/toggle-submit/{studentId}', [InvigilatorController::class, 'toggleSubmitStatus']);
});

Route::middleware(['auth', 'student'])
    ->prefix('student')
    ->controller(VideoSettingController::class)
    ->group(function () {


            Route::controller(StudentLiveExamController::class)->group(function () {
            Route::get('/live-exam/list', 'loadExamListPage')->name('student.live.exam.list');
            Route::get('/exam/notice', 'loadExamNoticePage')->name('student.exam.notice');
            Route::get('/exam', 'loadExamMainPage')->name('student.live.exam.main');
            Route::post('/student/exam', 'submitExamMainPage')->name('student.live.exam.main.submit');
            Route::post('/student/{exam}/violation/rules', 'submitTabSwitchCount')->name('student.live.exam.tab.switch.count');
            Route::get('/student/live-exam/success', 'loadExamSuccessPage')->name('student.live.exam.success');
            Route::post('/student/exams/answers','answerStore')->name('student.exam.answer.store');
            Route::get('/delete','deleteAllExamData')->name('student.delete.exam');
        });



        

    });
Route::get('/force-logout', function () {

    // Create a fake POST request to the logout route
    request()->setMethod('POST');

    return app()->call('App\Http\Controllers\AuthController@logout');
})->name('force.logout');






##############################################################################################################################################################








// Admin panel
Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->controller(VideoSettingController::class)
    ->group(function () {

        Route::get('/video-settings', 'edit')->name('show.video.settings');
        Route::post('/video-settings', 'update')->name('store.video.settings');
        Route::get('/dashboard', 'showStudentDashboard')->name('student.dashboard');

    });





Route::get('/', function () {
    return redirect()->route('auth.registration.form');
})->name('root');



Route::controller(AuthController::class)->group(function () {
    Route::get("/HscMisssionA+/registration", "loadRegistrationForm")
        ->name("auth.registration.form");

    Route::get('/login', 'loadLoginForm')
        ->name('auth.login');

    Route::post('/login', 'login')
        ->name('auth.login.post');

    Route::post('/logout', 'logout')
        ->name('auth.logout');
});


Route::controller(Hsc26MapRegistrationController::class)->group(function () {

    Route::post('/register', 'store')
        ->name('execute.auth.hsc26mapregistration');

    Route::get('/registration-success', 'showSuccess')
        ->name('registration.success');

    Route::get('/admit-card', 'admitCard')
        ->name('admit.card');
});

Route::get('/student/video', [VideoController::class, 'show'])->name('student.video');


Route::get('/exam-info', [ExamInfoController::class, 'show'])->name('exam.info');
   





// 🚫 Error pages

Route::get('/forbidden', function () {
    abort(403);
})->name('error.forbidden');

