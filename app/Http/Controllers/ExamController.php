<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Overview;
use App\Models\Answer;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use \Datetime;
use DateInterval;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoggedInRequest;
use App\Models\User;
use Illuminate\Support\Carbon;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $exam = Exam::where('subject', $request->subject)->get();
        // dd($exam);
        return Inertia::render('Exam/ExamPage', [
            'title' => "Exam",
            'subject' =>  $request->subject,
            'exam' => $exam,
            // 'status' => session('status'),
        ]);
    }

    public function home()
    {
        $exams = Subject::where('is_available', true)->get();
        $answered = Answer::where('participant_id', Auth::user()->id)->get();
        // $overview_ = $overview->makeHidden(['mark', 'final_mark', 'is_correct', 'average_mark']);
        return Inertia::render('Home(PilihKategori)', [
            'title' => "Exam",
            'subjectExam' => $exams,
            'submitted' => $answered,
            // 'status' => session('status'),
        ]);
    }
    public function category()
    {
        $exams = Subject::where('is_available', true)->get();
        $answered = Answer::where('participant_id', Auth::user()->id)->get();
        // $overview_ = $overview->makeHidden(['mark', 'final_mark', 'is_correct', 'average_mark']);
        return Inertia::render('Home(PilihKategori)', [
            'title' => "Exam",
            'subjectExam' => $exams,
            'submitted' => $answered,
            // 'status' => session('status'),
        ]);
    }



    public function subcategory()
    {
        $exams = Subject::where('is_available', true)->get();
        $answered = Answer::where('participant_id', Auth::user()->id)->get();
        // $overview_ = $overview->makeHidden(['mark', 'final_mark', 'is_correct', 'average_mark']);
        return Inertia::render('PilihSubKategori', [
            'title' => "Exam",
            'subjectExam' => $exams,
            'submitted' => $answered,
            // 'status' => session('status'),
        ]);
    }

    public function subcategory2()
    {
        $exams = Subject::where('is_available', true)->get();
        $answered = Answer::where('participant_id', Auth::user()->id)->get();
        // $overview_ = $overview->makeHidden(['mark', 'final_mark', 'is_correct', 'average_mark']);
        return Inertia::render('PilihSubKategori2', [
            'title' => "Exam",
            'subjectExam' => $exams,
            'submitted' => $answered,
            // 'status' => session('status'),
        ]);
    }

    public function packet()
    {
        $exams = Subject::where('is_available', true)->get();
        $answered = Answer::where('participant_id', Auth::user()->id)->get();
        // $overview_ = $overview->makeHidden(['mark', 'final_mark', 'is_correct', 'average_mark']);
        return Inertia::render('PilihPaket', [
            'title' => "Exam",
            'subjectExam' => $exams,
            'submitted' => $answered,
            // 'status' => session('status'),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        // $examHidden = Exam::where('subject_id', $request->id)->makeHidden(['actual_answer'])->get()->toArray();

        $exam = Exam::where('subject_id', $request->id)->get()->makeHidden(['actual_answer'])->toArray();
        $subject = Subject::where('id', $request->id)->first();
        $now = Carbon::now();
        $ended = new Carbon(Auth::user()->can_access_tryout_until);
        if(!$now->between($subject->exam_started, $ended->endOfDay(), true)) {
            return back()->with('message', 'sudahlewat'.strval(rand()));
        };

        // $answered = Answer::where('participant_id', Auth::user()->id)->get()->toArray();
        // foreach ($answered as $answer) {
        //     if($answer['subject_id'] == $request->id) {
        //         return back()->with('message', 'sudahselesai'.strval(rand()));
        //     }
        // }
        $user = User::where('id', Auth::user()->id);
        $user->update(['is_doing_exam' => true]);
        $user->update(['exam_currently_doing' => $exam[0]["subject_id"]]);

        function menitKeTimestamp($menit) {
            // Membuat objek DateTime untuk hari ini
            $sekarang = new DateTime();

            // Menghitung waktu tambahan berdasarkan menit
            $waktuTambahan = $menit * 60 * 1000;
            // $waktuTambahan = menitKeTimestamp($menit);

            // Menambahkan waktu tambahan ke objek DateTime
            $sekarang->add(new DateInterval('PT' . round($waktuTambahan / 1000) . 'S'));

            // Mendapatkan timestamp dalam milidetik
            $timestamp = $sekarang->getTimestamp() * 1000;

            return $timestamp;
        }

        // Contoh penggunaan fungsi
        $menit = $request->exam_duration;
        $timestampMs = menitKeTimestamp($menit);
        // dd($timestampMs);

        return Inertia::render('Exam/ExamPage', [
            'title' => "Exam",
            'subject' =>  $request->name,
            'subjectId' => $request->id,
            'exam' => $exam,
            'timestampForTimer' => $timestampMs,
            'exam_type' => $subject->exam_type
            // 'status' => session('status'),
        ]);
    }

    public function showCurrentWork(Request $request)
    {
        $exam = Exam::where('subject_id', Auth::user()->exam_currently_doing)->get()->makeHidden(['actual_answer'])->toArray();
        $subject = Subject::where('id', Auth::user()->exam_currently_doing)->get()->toArray();
        $answered = Answer::where('participant_id', Auth::user()->id)->get()->toArray();
        $exam_type = Subject::whereId(Auth::user()->exam_currently_doing)->first()->exam_type;

        $user = User::where('id', Auth::user()->id);
        $user->update(['is_doing_exam' => true]);
        $user->update(['exam_currently_doing' => Auth::user()->exam_currently_doing]);

        function menitKeTimestamp($menit) {
            // Membuat objek DateTime untuk hari ini
            $sekarang = new DateTime();

            // Menghitung waktu tambahan berdasarkan menit
            $waktuTambahan = $menit * 60 * 1000;
            // $waktuTambahan = menitKeTimestamp($menit);

            // Menambahkan waktu tambahan ke objek DateTime
            $sekarang->add(new DateInterval('PT' . round($waktuTambahan / 1000) . 'S'));

            // Mendapatkan timestamp dalam milidetik
            $timestamp = $sekarang->getTimestamp() * 1000;

            return $timestamp;
        }

        // Contoh penggunaan fungsi
        $menit = $subject[0]["exam_duration"];
        $timestampMs = menitKeTimestamp($menit);
        // dd($timestampMs);
        return Inertia::render('Exam/ExamPage', [
            'title' => "Exam",
            'subject' =>  $subject[0]["name"],
            'subjectId' => Auth::user()->exam_currently_doing,
            'exam' => $exam,
            'timestampForTimer' => $timestampMs,
            'exam_type' => $exam_type
            // 'status' => session('status'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        //
    }

    public function updateDoingExam(LoggedInRequest $request) {
        User::where('id', $request->id)
            ->update($request);
    }
}
