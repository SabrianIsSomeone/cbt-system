<?php

namespace App\Http\Controllers;

use App\Models\Overview;
use App\Models\Answer;
use App\Models\Exam;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Session;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function auto_correct()
    {
        //ambil data dari submit
        $data = Session::get('data');
        // ddd($data);

        // Data peserta
        // Ambil jawaban, correction status, dan nilai yang sesuai dengan urutan
        $correction_status = $data->correction_status;
        $AllstudentAnswers = $data->answer;
        $all_mark = $data->mark;
        $is_correct = $data->is_correct;

        // Ambil semua data exam berdasarkan subject_id
        $exams = Exam::where('subject_id', $data->subject_id)->get();

        // Loop melalui setiap exam
        $actualAnswers = [];
        $multiple_c_answers = [];
        $points = [];
        foreach ($exams as $key => $exam) {
            // Tambah ke array (ambil yg pilgan saja)
            if ($exam->is_essay == false) {
                $actualAnswers[] = $exam->actual_answer;
                $multiple_c_answers[] = $AllstudentAnswers[$key];
                $points[] = $exam->point;
                $correction_status[$key] = true;

                // Tambahkan logika untuk memperbarui is_correct jika jawaban benar
                if ($AllstudentAnswers[$key] == $exam->actual_answer) {
                    $is_correct[$key] = true;
                    $all_mark[$key] = $exam->point;
                }
            }
            // Kalo essay
            else if ($exam->is_essay == true) {
                // status koreksi jadi false
                $correction_status[$key] = false;
            }
        }

        // Zip & Urutkan
        $pairedData = collect($multiple_c_answers)
            ->zip($actualAnswers, $points);


        // Hitung jawaban yang benar dan jumlahkan poinnya
        $correctAnswers = $pairedData
            ->filter(function ($pair) {
                return $pair[0] == $pair[1];
            });

        $totalPoints = $correctAnswers
            ->sum(function ($pair) {
                return $pair[2]; // Mengambil point dari pair
            });

        $correctAnswered = collect($multiple_c_answers)
            ->zip($actualAnswers)
            ->filter(function ($pair) {
                return ($pair[0] == $pair[1]);
            })->count();

        // Masukkan ke tabel Overview Sementara

        // Simpan informasi di tabel Overview
        Overview::create(
            [
                'answer_id' => $data->id,
                'participant_id' => $data->participant_id,
                'subject_id' => $data->subject_id,
                'multiple_choice_correct' => $correctAnswered,
                'temporary_mark' => $totalPoints,
            ],
            // [
            //     // Nanti diubah jadi banyak yang total benar be

            // ]
        );

        Answer::where('id', $data->id)->update([
            'correction_status' => $correction_status,
            'is_correct' => $is_correct,
            'mark' => $all_mark,
        ]);

        // return Redirect::route('home')->with('message', 'Ujian telah berhasil disubmit!');
        // Return dan langsung menampilkan nilai
        return Redirect::route('exam.result')->with(['data' => $data]);



    }

    public function auto_correct_from_exam()
    {
        //
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
        $data = Overview::where('answer_id', $request->answer_id)
            ->where('participant_id', $request->participant_id)->first();

        $data->makeHidden(['temporary_mark', 'final_mark', 'multiple_choice_correct', 'essay_correct', 'essay_mark', 'average_mark']);

        return Inertia::render('Exam/ExamDone', [
            'title' => "Riwayat Jawaban",
            'subject' =>  $request->subject,
            'data' =>  $data,
        ]);
    }

    public function result()
    {
        $data = Session::get('data');
        if($data == null) {
            return redirect()->route('home');
        }
        $subject = Subject::find($data['subject_id']);
        // Dapetin Nilai/Overview dari id answer
        $overview = Overview::find($data['id']);
        return Inertia::render('Exam/ExamResult', [
            'title' => "Nilai TryOut",
            'subject' => $subject,
            'data' =>  $data,
            'mark' => $overview->temporary_mark
        ]);
    }

    public function history()
    {
        // Dapetin Nilai/Overview dari id answer
        $riwayat = Overview::with('subject')->where('participant_id', Auth::user()->id)->get();
        return Inertia::render('Exam/ExamHistory', [
            'title' => "Nilai Ujian",
            'riwayat' => $riwayat,
            // 'mark' => $overview->temporary_mark
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Overview $overview)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Overview $overview)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Overview $overview)
    {
        //
    }
}
