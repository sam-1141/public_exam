<?php

namespace App\Http\Controllers;

use App\Mail\ForgotPasswordOtpMail;
use App\Models\Batch;
use App\Models\StudentClass;
use App\Models\TempUser;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Global send_sms function for this controller
     */
    protected function send_sms($message, $numbers)
    {
        $url = config('ftservices.bulk_sms.url');
        $api_key = config('ftservices.bulk_sms.api_key');
        $senderid = config('ftservices.bulk_sms.sender_id');

        $data = [
            'api_key' => $api_key,
            'senderid' => $senderid,
            'number' => $numbers,
            'message' => $message,
        ];

        // Initialize cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        // Execute the API call
        $response = curl_exec($ch);

        // Close cURL
        curl_close($ch);

        // Return the API response
        return $response;
    }

    /**
     * Global verify otp function for this controller
     */
    protected function isOtpValid($user, $otp)
    {
        return $user->otp == $otp && Carbon::now()->lessThanOrEqualTo($user->otp_expires_at);
    }

    // function for load login form
    // public function loadLoginForm(Request $req)
    // {
    //     if (Auth::check()) {
    //         return to_route('dashboard');
    //     }

    //     $redirect_url = $req->query('redirect');
    //     if ($redirect_url) {
    //         session(['redirect_url' => $redirect_url]);
    //     }

    //     $core_app_registration_url = config('ftservices.core.auth.registration');

    //     return Inertia::render('authentication/Login', ['core_app_registration_url' => $core_app_registration_url]);
    // }

    // function for load registration form

    public function loadLoginForm(Request $req)
    {
        // If already logged in → redirect based on role
        if (Auth::check()) {
            $user = Auth::user();

            if ($user->role === 'admin') {
                return to_route('student.dashboard');
            }
            if ($user->role === 'student') {
                return to_route('student.exam.notice');
            }

            return to_route('auth.login');
        }

        // Store redirect URL if provided
        if ($req->has('redirect')) {
            session(['redirect_url' => $req->query('redirect')]);
        }

        // Send environment variable to Inertia
        $core_app_registration_url = config('ftservices.core.auth.registration');

        return Inertia::render('authentication/Login', [
            'core_app_registration_url' => $core_app_registration_url
        ]);
    }

    public function loadRegistrationForm()
    {
        // if (Auth::check()) {
        //     return to_route('dashboard');
        // }
        // $classes = StudentClass::where('status', '1')->get();
        // $batches = Batch::where('status', '1')->get();
        $classes = '5';
        $batches = '2024';

        return Inertia::render('authentication/Registration', ['classes' => $classes, 'batches' => $batches]);
    }

    // In AuthController.php
    // public function loadRegistrationForm(Request $request)
    // {
    //     $baseUrl = url()->current();
    //     $encodedUrl = base64_encode($baseUrl); // encode the current URL in Base64 format
    //     $referrerUrl = $encodedUrl;
    //     $registerUrl = config('ftservices.core.auth.registration');

    //     return redirect()->to("{$registerUrl}?referrer_url={$referrerUrl}");
    // }

    // function for load loadVerifyOtpForm
    public function loadVerifyOtpForm()
    {
        return Inertia::render('authentication/OtpPage');
    }

    // function for load forgot password verify otp page
    public function loadForgotPasswordOtpForm()
    {
        return Inertia::render('authentication/ForgotPasswordOtp');
    }

    // function for load loadSetPasswordForm
    public function loadSetPasswordForm()
    {
        return Inertia::render('authentication/SetPassword');
    }

    // function for load set new password form
    public function loadSetNewPassword()
    {
        return Inertia::render('authentication/NewPassword');
    }

    // function for load forgot password form
    public function loadForgotPasswordForm()
    {
        return Inertia::render('authentication/ForgotPassword');
    }

    // function for validate and register account
    public function registration(Request $req)
    {
        //        dd($req->all());
        $validated = $req->validate([
            'name' => 'string|required|min:2',
            'mobile' => 'string|numeric|required',
            'fb_id' => [
                'nullable',
                'url',
                //                'regex:/^(https?:\/\/)?(www\.|m\.|web\.|fb\.)?(facebook\.com|fb\.com)\/(profile\.php\?id=\d+|[A-Za-z0-9.\-_]+)(\/)?$/i'
            ],
        ]);

        try {
            $existing_user = User::where('mobile', $validated['mobile'])
                ->first();

            if ($existing_user) {
                return to_route('auth.login')->with('error', 'An account with this mobile number already exists. Please log in.');
            }

            // generate otp
            $otp = rand(1111, 9999);
            $otp_expires_at = Carbon::now()->addMinutes(5);

            // Prepare message
            $expiryTime = $otp_expires_at->format('l, F j, Y g:i A');
            $message = "Your OTP for account verification is {$otp}. This code will expire in {$expiryTime}.";

            $validated['otp'] = $otp;
            $validated['otp_expires_at'] = $otp_expires_at;

            // prepare number for send otp
            $numbers = [$req->mobile];
            // send otp
            $this->send_sms($message, $numbers);

            $user = TempUser::create($validated);

            // after send otp redirect to route

            return to_route('load.otp.form')->with([
                'user_id' => $user->id,
                'message' => 'তোমার <strong>' . $validated['mobile'] . '</strong> নম্বরে ৪ ডিজিটের OTP পাঠানো হয়েছে। অ্যাকাউন্ট ভেরিফাই ও পাসওয়ার্ড সেট করতে OTP টি নিচে লিখো।',
            ]);
        } catch (\Exception $e) {
            return $e;

            return to_route('auth.registration.form')->with('error', 'An error occurred while registration.');
        }
    }

    // function for login
    // public function login(Request $request)
    // {
    //     $request->validate([
    //         'login'    => 'required|string',
    //         'password' => 'required|string',
    //     ]);

    //     $loginField = filter_var($request->login, FILTER_VALIDATE_EMAIL) ? 'email' : 'mobile';
    //     $user = User::where($loginField, $request->login)->first();

    //     if (!$user || !password_verify($request->password, $user->password)) {
    //         return redirect()->route('auth.login')
    //                          ->with('error', 'ইমেইল/মোবাইল বা পাসওয়ার্ড সঠিক নয়।')
    //                          ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
    //                          ->header('Pragma', 'no-cache')
    //                          ->header('Expires', '0');
    //     }

    //     if ($user->status != 1) {
    //         Auth::logout();
    //         return redirect()->route('auth.login')
    //                          ->with('error', 'Your account is deactivated. Please contact the administrator.')
    //                          ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
    //                          ->header('Pragma', 'no-cache')
    //                          ->header('Expires', '0');
    //     }

    //     Auth::login($user);
    //     $request->session()->regenerate(); // prevent session fixation

    //     // Setup secure, persistent cookie
    //     $host = request()->getHost();
    //     $domain = in_array($host, ['localhost', '127.0.0.1']) ? null : '.' . implode('.', array_slice(explode('.', $host), -2));
    //     $secure = app()->environment('production');

    //     $cookie = cookie(
    //         'ft_roar',
    //         $user->id,
    //         60 * 24 * 7, // 7 days
    //         '/',
    //         $domain,
    //         $secure,
    //         true,   // HttpOnly for security
    //         true,   // SameSite strict
    //         'lax'
    //     );

    //     // Handle redirect_url safely
    //     $redirectUrl = session()->pull('redirect_url');
    //     if ($redirectUrl) {
    //         $decodedUrl = base64_decode($redirectUrl, true);
    //         if ($decodedUrl && filter_var($decodedUrl, FILTER_VALIDATE_URL)) {
    //             return response('', 409)
    //                 ->header('X-Inertia-Location', $decodedUrl)
    //                 ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
    //                 ->header('Pragma', 'no-cache')
    //                 ->header('Expires', '0')
    //                 ->withCookie($cookie);
    //         }
    //     }

    //     // Default intended route
    //     $intended = session()->get('url.intended', route('dashboard'));
    //     session(['url.intended' => route('dashboard')]);

    //     return redirect($intended)
    //         ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
    //         ->header('Pragma', 'no-cache')
    //         ->header('Expires', '0')
    //         ->withCookie($cookie);
    // }

    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        $loginField = filter_var($request->login, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        $user = User::where($loginField, $request->login)->first();

        if (!$user || !password_verify($request->password, $user->password)) {
            return back()->with('error', 'Incorrect credentials.');
        }

        if ($user->status != 1) {
            return back()->with('error', 'Your account is deactivated.');
        }
        // If user is already logged in from another device
        if ($user->logged_in == 1 && $user->role === 'student') {
            return back()->with('error', 'You are already logged in. Please contact the helpline.');
        }

        // Otherwise mark the user as logged in
        $user->logged_in = 1;
        $user->save();

        Auth::login($user);
        $request->session()->regenerate();

        // set cookie
        $cookie = cookie(
            'ft_roar',
            $user->id,
            60,
            '/',
            null,
            false,
            true,
            true,
            'lax'
        );

        // redirect based on role
        if ($user->role === 'admin') {
            return redirect()->route('show.video.settings')->withCookie($cookie);
        }

        // if ($user->role === 'student') {
        //     return redirect()->route('student.dashboard')->withCookie($cookie);
        // }

        // return redirect()->route('dashboard')->withCookie($cookie);
    }

    public function logout(Request $request)
    {

         $user = Auth::user();
         if ($user->role === 'student') {
            
            $user->logged_in = 0;
            $user->save();
        }
        
        // Forget custom cookie
        $forgetCookie = Cookie::forget('ft_roar');

        Auth::logout();

        // Invalidate session & regenerate token
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $request->session()->regenerate();

        return redirect()
            ->route('auth.login')
            ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0')
            ->withCookie($forgetCookie);
    }

    // public function logout(Request $request)
    // {
    //     // Forget custom cookie
    //     $forgetCookie = Cookie::forget('ft_roar');

    //     Auth::logout();

    //     // Invalidate session & regenerate token
    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();
    //     $request->session()->regenerate();

    //     return redirect()->route('auth.login')
    //         ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
    //         ->header('Pragma', 'no-cache')
    //         ->header('Expires', '0')
    //         ->withCookie($forgetCookie);
    // }

    // method for verify otp
    public function verifyOtp(Request $req)
    {
        $req->validate([
            'otp' => 'string|required|numeric',
        ]);

        try {
            $user = TempUser::where('id', $req->user_id)->first();

            // return $this->isOtpValid($user, $req->otp);
            if ($this->isOtpValid($user, $req->otp)) {
                return to_route('load.set.password.form')
                    ->with(['message' => 'Please set a new password for your account to complete the verification process.', 'user_id' => $user->id]);
            } else {
                // If OTP is invalid or expired
                return to_route('load.otp.form')->with([
                    'user_id' => $user->id,
                    'error_message' => 'Invalid or expired OTP',
                ]);
            }
        } catch (\Exception $e) {
            return $e;

            return to_route('auth.registration.form')->with('error', 'An error occurred while verify otp.');
        }
    }

    // method for final signup of a student
    public function signUp(Request $req)
    {
        //        dd($req->all());
        $validated = $req->validate([
            'password' => 'required|string|min:4',
            'confirm_password' => 'required|string|min:4',
        ]);

        if ($req->user_id == 'timeout') {
            return to_route('auth.registration.form')->with('error', 'Session Expired! Try again');
        }

        try {
            $temp_user = TempUser::where('id', $req->user_id)->first();

            //            dd($temp_user);

            $existing_user = User::where('mobile', $temp_user->mobile)
                ->first();

            if ($existing_user) {
                return to_route('auth.login')->with('error', 'An account with this email or mobile already exists. Please log in.');
            }

            $userDetails = [
                'name' => $temp_user->name,
                'password' => $validated['password'],
                'mobile' => $temp_user->mobile,
                'fb_id' => $temp_user->fb_id,
            ];

            $user = User::create($userDetails);

            // Log in the user
            Auth::login($user);

            // delete temporary user
            $temp_user->delete();

            $token = $user->id;
            $domain = '.' . implode('.', array_slice(explode('.', request()->getHost()), -2));

            $cookie = cookie(
                'ft_roar',
                $token,
                60 * 24 * 7,
                '/',
                $domain,
                true,
                false,
                false,
                'lax'
            );

            // Redirect to dashboard
            return to_route('dashboard')->withCookie($cookie);
        } catch (\Exception $e) {
            return $e;

            return to_route('load.set.password.form')->with('error', 'An error occurred while signup.');
        }
    }

    // method for change user password
    public function changePassword(Request $req)
    {
        // Validate the input data
        $validated = $req->validate([
            'oldPassword' => 'required|string',
            'newPassword' => 'required|string',
        ]);
        try {
            // Get the currently authenticated user
            $user = User::where('id', $req->user_id)->first();
            // get user role
            $role = $user->role;

            // Check if the old password matches the one in the database
            if (!Hash::check($req->oldPassword, $user->password)) {
                if ($role == 'solver') {
                    return to_route('solver.profile')->with('error', 'The provided old password is incorrect.');
                }

                return to_route('student.profile')->with('error', 'The provided old password is incorrect.');
            }

            // update the password
            $user->password = Hash::make($req->newPassword);
            $user->save();

            if ($role == 'solver') {
                return to_route('solver.profile')->with('success', 'Password changed successfully.');
            }

            return to_route('student.profile')->with('success', 'Password changed successfully.');
        } catch (\Exception $e) {
            if ($role == 'solver') {
                return to_route('student.profile')->with('error', 'An error occurred: ');
            }

            return to_route('student.profile')->with('error', 'An error occurred: ');
        }
    }

    // execute forgot password logic
    public function executeForgotPassword(Request $req)
    {
        $validated = $req->validate([
            'mobile' => [
                'required_without:email',
                'nullable',
                'regex:/^01[0-9]{9}$/',
            ],
            'email' => [
                'required_without:mobile',
                'nullable',
                'email',
            ],
        ]);

        try {
            // generate otp
            $otp = rand(1111, 9999);
            $otp_expires_at = Carbon::now()->addMinutes(5);

            // Prepare message
            $expiryTime = $otp_expires_at->format('l, F j, Y g:i A');
            $message = "Your OTP for reset password is {$otp}. This code will expire in {$expiryTime}.";

            if ($req->email) {
                // find user using email
                $email = $validated['email'];
                $user = User::where('email', $email)->first();

                if (!$user) {
                    return to_route('auth.forgot.password')->with('error', 'No account found with this email. Try another.');
                }

                // Send OTP email using Mailable
                try {
                    Mail::to($user->email)->send(new ForgotPasswordOtpMail($otp, $expiryTime));
                } catch (\Exception $e) {
                    return to_route('auth.forgot.password')->with('error', 'Failed to send OTP email. Please try again.');
                }
            } else {
                // find user using mobile number
                $mobile = $validated['mobile'];
                $mobile_88 = 88 . $mobile;
                $user = User::where('mobile', $mobile)->first();

                if (!$user) {
                    $user = User::where('mobile', $mobile_88)->first();
                    if (!$user) {
                        return to_route('auth.forgot.password')->with('error', 'No account found with this number. Try another.');
                    }
                }

                // prepare number for send otp
                $numbers = [$req->mobile];
                // send otp
                $this->send_sms($message, $numbers);
            }

            // update user table and set otp and expire time
            $user->update([
                'otp' => $otp,
                'otp_expires_at' => $otp_expires_at,
            ]);

            // after send otp redirect to route

            $ret_msg = 'তোমার <strong>' . $validated['mobile'] . '</strong> নাম্বারে একটি ৪ ডিজিটের কোড পাঠানো হয়েছে । ৪ ডিজিটের কোডটি এখানে লিখো।<br>এই কোডটি দিয়ে তোমার মোবাইল নম্বরটি যাচাই করা হবে এবং পরবর্তীতে তুমি নতুন পাসওয়ার্ড সেট করতে পারবে ।';

            if ($req->email) {
                $ret_msg = 'তোমার <strong>' . $validated['email'] . '</strong> ই-মেইল এ একটি ৪ ডিজিটের কোড পাঠানো হয়েছে । ৪ ডিজিটের কোডটি এখানে লিখো।<br>এই কোডটি দিয়ে তোমার ইমেইল যাচাই করা হবে এবং পরবর্তীতে তুমি নতুন পাসওয়ার্ড সেট করতে পারবে ।';
            }

            return to_route('load.forgot.verify.otp')->with([
                'user_id' => $user->id,
                'message' => $ret_msg,
            ]);
        } catch (\Exception $e) {
            return to_route('auth.forgot.password')->with('error', 'An error occurred: ');
        }
    }

    // function for verify forgot password otp
    public function verifyForgotPasswordOtp(Request $req)
    {
        $req->validate([
            'otp' => 'string|required|numeric',
        ]);

        try {
            $user = User::where('id', $req->user_id)->first();

            // return $this->isOtpValid($user, $req->otp);
            if ($this->isOtpValid($user, $req->otp)) {
                return to_route('load.new.password.form')
                    ->with(['user_id' => $user->id, 'message' => 'পাসওয়ার্ড রিকভারি সম্পূর্ণ করতে তোমার অ্যাকাউন্টের জন্য একটি নতুন পাসওয়ার্ড সেট করো।']);
            } else {
                // If OTP is invalid or expired
                return to_route('load.forgot.verify.otp')->with([
                    'user_id' => $user->id,
                    'error_message' => 'Invalid or expired OTP',
                ]);
            }
        } catch (\Exception $e) {
            return $e;

            return to_route('auth.registration.form')->with('error', 'An error occurred while verify otp.');
        }
    }

    // function for set new password to user
    public function setNewPassword(Request $req)
    {
        $validated = $req->validate([
            'password' => 'required|string|min:4',
            'confirm_password' => 'required|string|min:4',
        ]);

        if ($req->user_id == 'timeout') {
            return to_route('auth.forgot.password')->with('error', 'Session Expired! Try again');
        }

        try {
            $user = User::where('id', $req->user_id)->first();

            if (!$user) {
                return to_route('auth.forgot.password')->with('error', 'No account found with this number. Try another.');
            }

            // update the password
            $user->password = Hash::make($req->password);
            $user->save();

            return to_route('auth.login')->with('success', 'Your password has been changed successfully!');
        } catch (\Exception $e) {
            return $e;

            return to_route('load.new.password.form')->with('error', 'An error occurred while reset password.');
        }
    }
}
