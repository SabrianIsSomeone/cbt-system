<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ExamController;
use App\Models\Subject;

class IsDoingExamCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            if (Auth::user()->is_doing_exam == true) {
                return redirect()->route('exam.show.current')->with('message', 'belumselesai'.strval(rand()));
            } else {
                return $next($request);
            }
        } else {
            return redirect()->back();
        }
    }
}
