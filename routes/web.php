<?php

use App\Http\Controllers\Admin\LiveExamController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\ProgressReportController;
use App\Http\Controllers\TrialExamController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Controllers\authController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HardnessController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\MaterialsController;
use App\Http\Controllers\PracticeExamController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TopicController;

use function PHPUnit\Framework\callback;

Route::middleware([AuthMiddleware::class])->group(function () {
    Route::controller(DashboardController::class)->group(function () {
        Route::get('/', 'index')->name('dashboard');
        Route::get('/about', 'about')->name('about');
        Route::get('/student/dashboard', 'studentDashboard')->name('student.dashboard');
    });

    Route::controller(MaterialsController::class)->group(function () {
        Route::get("/manage/material", "index")->name("manage.material");
    });

    Route::controller(QuestionController::class)->group(function () {
        Route::get('/add-questions', 'addQuestions')->name('add.questions');
        Route::get('/add-mcq/{class?}/{subject?}/{chapter?}', 'create')->name('page.add.mcq');
        Route::post('/add-mcq', 'store')->name('execute.submit.add.mcq.form');
        Route::get('/mcq-bank', 'mcqBank')->name('mcq.bank');
        Route::delete("/delete-mcq/{id}", 'deleteMcq')->name('delete.mcq');
        Route::get("/edit-mcq/{id}", "editMcq")->name("edit.mcq");
        Route::put("/update-mcq/{id}", "updateMcq")->name("update.mcq");
        Route::get('/quick-question/{class?}/{subject?}/{chapter?}', [QuestionController::class, 'quickQuestion'])->name('page.quick.question');
        Route::post('/quick-question', [QuestionController::class, 'storeQuickQuestion'])->name('execute.submit.quick.question');
    });

    Route::controller(TagController::class)->group(function () {
        Route::post('/add-tags', "store")->name('add.tags');
        Route::put('/update-tag/{id}', [TagController::class, 'update'])->name('update.tag');
        Route::delete('/delete-tag/{id}', [TagController::class, 'destroy'])->name('delete.tag');
    });

    Route::controller(HardnessController::class)->group(function () {
        Route::post('/add-hardness', "store")->name('add.hardness');
        Route::put('/update-hardness/{id}', [HardnessController::class, 'update'])->name('update.hardness');
        Route::delete('/delete-hardness/{id}', [HardnessController::class, 'destroy'])->name('delete.hardness');
    });

    Route::controller(TopicController::class)->group(function () {
        Route::post('/add-topics', "store")->name('add.topics');
        Route::put('/update-topic/{id}', [TopicController::class, 'update'])->name('update.topic');
        Route::delete('/delete-topic/{id}', [TopicController::class, 'destroy'])->name('delete.topic');
    });

    Route::controller(ProgressReportController::class)->group(function () {
        Route::get('/student/progress-report', 'loadProgressReport')->name('student.progress.report');
    });

    Route::controller(LeaderboardController::class)->group(function () {
        Route::get('/student/leaderboard', 'loadLeaderBoardPage')->name('student.leaderboard');

        Route::get('/admin/leaderboard', 'loadAdminLeaderBoardPage')->name('admin.leaderboard');
    });

    Route::controller(TrialExamController::class)->group(function () {
        Route::get('/student/trial-exam', 'loadTrialExamPage')->name('student.trial.exam');
    });

    Route::post('/exam/store', [LiveExamController::class, 'store'])->name('execute.store.exam');

    Route::controller(LiveExamController::class)->group(function () {
        Route::get('/student/live-exam/notice', 'loadExamNoticePage')->name('student.live.exam.notice');
        Route::get('/student/live-exam/exam', 'loadExamMainPage')->name('student.live.exam.main');
        Route::get('/student/live-exam/success', 'loadExamSuccessPage')->name('student.live.exam.success');
            /* Admin */
        // exam management
        Route::get('/add-exam', 'loadAddExamPage')->name('admin.add.exam');
        Route::get('/add-exam/live-exam', 'loadAddLiveExamPage')->name('admin.add.live.exam');
        Route::post('/add-exam/live-exam', 'loadAddLiveExamPage')->name('admin.add.live.exam');
        Route::get('/add-exam/practice-exam', 'loadAddPracticeExamPage')->name('admin.add.practice.exam');

        Route::get('/exams/{type}/{exam}', 'loadViewExamDetails')->name('admin.exam.details');

    });

    Route::controller(PracticeExamController::class)->group(function () {
        Route::get('/student/practice-exam/practice', 'loadPracticeExamListPage')->name('student.practice.exam.list');
        Route::get('/student/practice-exam/{exam}', 'loadPracticeExamPage')->name('student.practice.exam');
        Route::post('/student/practice-exam/{exam}/result', 'loadPracticeExamResult')->name('student.practice.exam.result');
    });

    Route::controller(ArchiveController::class)->group(function () {
        Route::get('/student/archive', 'loadArchivePage')->name('student.archive.exam');
    });

    Route::controller(HistoryController::class)->group(function () {
        Route::get('/student/history', 'loadHistoryPage')->name('student.history');
        Route::get('/student/answer-sheet', 'loadAnswerSheetPage')->name('student.answer.sheet');
    });

});

Route::controller(authController::class)->group(function () {

    // route for load login form
    Route::get("/auth/login", "loadLoginForm")->name("auth.login");
    Route::get('/logout', 'logout')->name('auth.logout');

    // route for load forgot passwordForm
    Route::get("/auth/forgot-password", "loadForgotPasswordForm")->name('auth.forgot.password');
    // route for load registration form
    Route::get("/auth/registration", "loadRegistrationForm")->name("auth.registration.form");
    // route for load verify otp form
    Route::get("/verify/otp", "loadVerifyOtpForm")->name("load.otp.form");
    // route for load forgot password otp form
    Route::get("/forgot-password/verify/otp", "loadForgotPasswordOtpForm")->name("load.forgot.verify.otp");
    // route for load set password form
    Route::get("/auth/set/password", "loadSetPasswordForm")->name("load.set.password.form");
    // route for load set new password form
    Route::get("/forgot/set/new/password", "loadSetNewPassword")->name("load.new.password.form");

    #=== Post Routes ===#
    // route for login
    Route::post("/auth/login", "login")->name("execute.auth.login");
    // route for registration
    Route::post("/auth/registration", "registration")->name("execute.auth.registration");
    // route for check otp
    Route::post("/verify/otp", "verifyOtp")->name("verify.otp");
    // route for set password
    Route::post("/auth/set/password", "setNewPassword")->name("auth.set.password");
    // route for execute final registration for student
    Route::post("/execute/signup", "signUp")->name("execute.final.signup");

    // route for user password
    Route::post("/execute/change/password", "changePassword")->name("execute.change.password");
    // route for execute forgot password logic
    Route::post("/execute/forgot/password", "executeForgotPassword")->name("execute.forgot.password");
    // route for execute set new password
    Route::post("/execute/forgot/set/new/password", "setNewPassword")->name("execute.set.new.password");
    // route for check forgot password otp
    Route::post("/forgot/password/otp/verify", "verifyForgotPasswordOtp")->name("forgot.password.otp.verify");
});
