<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            if (\Cookie::get('ft_roar')) {
                $token = \Cookie::get('ft_roar');
                $user = User::where('id', $token)->first();
                if ($user) {
                    Auth::login($user);
                } else {
                    session(['url.intended' => $request->fullUrl()]);
                    return to_route('auth.login')->with('error', 'Please login!');
                }

                $user = Auth::user();
                if ($user->status == 1) {
                    return $next($request);
                }
                Auth::logout();
                return to_route('auth.login')->with('error', 'Your account is deactivated. Please contact the administrator.');
            }
        }

        if (Auth::check()) {
            $user = Auth::user();
            if ($user->status == 1) {
                return $next($request);
            }
            Auth::logout();
            $forgetCookie = Cookie::forget('ft_roar');

            return to_route('auth.login')->with('error', 'Your account is deactivated. Please contact the administrator.')->withCookie($forgetCookie);
        }
        session(['url.intended' => $request->fullUrl()]);
        return to_route('auth.login')->with('error', 'Please login!');

    }
}
