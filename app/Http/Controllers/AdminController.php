<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\User;
use App\Models\Overview;
use App\Models\Answer;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\SoalUpdateRequest;
use App\Http\Requests\PesertaUpdateRequest;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::where('is_admin', false)->count();
        $subject = Subject::all()->count();
        $done = Overview::all()->groupBy('participant_id')->count();
        return Inertia::render('Admin/Dashboard', [
            'title' => "Administrator",
            'user' => $user,
            'subject' => $subject,
            'doneSubmitted' => $done,
            'notYet' => $user - $done,

            // 'status' => session('status'),
        ]);
    }

    public function all_subject()
    {
        $subject = Subject::all();
        return Inertia::render('Admin/SubjectPage', [
            'title' => "Materi Soal",
            'subjects' => $subject,
            // 'status' => session('status'),
        ]);
    }

       // Create
       public function store_subject(Request $request) {
        // dd($request);
        $validated = $request->validate([
            'name' => 'required|string|max:20|unique:subjects,name,' .$request->id,
            'exam_duration' => 'required|integer|max:1000',
            'exam_started' => 'required|date',
            'exam_ended' => 'required|date',
            'image' => 'nullable|image|file|max:8000',
            'exam_type' => 'required|string',
            'exam_dir' => 'required|string'
        ]);

        // Logic Image Nanti
        if ($request->file('image')) {
            $imageName = $request->name . '.' . $request->file('image')->getClientOriginalExtension();
            $validated['image'] = $request->file('image')->storeAs('subject-img', $imageName);
        }

        // Simpan jawaban
        $subject = Subject::create($validated);
        return back()->with('message', 'Berhasil Menambahkan Materi Ujian Baru');

    }

     // Update
     public function update_subject(Request $request) {
        // dd($request->id);
        // Rules
        $validated = $request->validate([
            'name' => 'required|string|max:20|unique:subjects,name,' .$request->id,
            'exam_duration' => 'required|integer|max:1000',
            'exam_started' => 'required|date',
            'exam_ended' => 'required|date',
            'image' => 'nullable|image|file|max:8000',
            'is_available' => 'nullable',
            'exam_dir' => 'required|string'
        ]);

        // Logic Image Nanti
        if ($request->file('image')) {
            $imageName = $request->name . '.' . $request->file('image')->getClientOriginalExtension();
            $validated['image'] = $request->file('image')->storeAs('subject-img', $imageName);
        }

        // Simpan Update
        Subject::where('id', $request->id)
        ->update($validated);
        return back()->with('message', 'Berhasil Mengedit Materi Ujian');

    }


    public function destroy_subject(Request $request)
    {
        Subject::destroy($request->id);
        return back()->with('message', 'Materi Ujian Berhasil Dihapus');
    }

    public function soal(Request $request) {
        $exams = Exam::where('subject_id', $request->get('id'))->get();
        $exam_type = Subject::whereId($request->get('id'))->first()->exam_type;
        return Inertia::render('Admin/CreateEditExam', [
            'title' => "Soal",
            'exam' => $exams,
            'subject' => $request->get('name'),
            'subject_id' => $request->get('id'),
            'exam_type' => $exam_type,
            // 'status' => session('status'),
        ]);
    }

    public function store_soal(SoalUpdateRequest $request)
    {
        if($request->isEssay) {
            $validatedData = $request->validate([
                'subject_id' => "required|integer",
                'question' => "required|max:170",
                'is_essay' => "required|boolean",
                'actual_answer' => "required|max:70",
                "choice" => "required|array|min:1",
                "point" => "required|integer"
           ]);
        } else {
            $validatedData = $request->validate([
                'subject_id' => "required|integer",
                'question' => "required",
                'is_essay' => "required",
                'actual_answer' => "required",
                "choice" => "required|array|min:1",
                'choice.*' => "required|string|distinct|min:1",
                "point" => "required"
           ]);
        }
       if($request->image != null) {
           $validatedData['image'] = $request->file('image')->store('exam-images');
       };
        Exam::create($validatedData);
        return back()->with('message', 'suksesinput'.strval(rand()));
    }

    public function update_soal(SoalUpdateRequest $request)
    {
        $request->validate([
            'questionEdit' => "required",
            'actualAnswerEdit' => "required",
            'subjectEdit' => "required|integer",
            "choiceEdit" => "required|array|min:1",
            'choiceEdit.*' => "required|string|distinct|min:1",
            'pointEdit' => "required",
       ]);
       $data = Exam::find($request->id);
       $data->subject_id = $request->subjectEdit;
       $data->question = $request->questionEdit;
       $data->choice = $request->choiceEdit;
       $data->actual_answer = $request->actualAnswerEdit;
       $data->point = $request->pointEdit;
       if($request->imageEdit != null){
        $data->image = $request->file('imageEdit')->store('exam-images');
        $data->update($request->except(['imageEdit']));
       } else {
        if($request->isDeleteImg) {
            $data->image = null;
        }
        $data->update($request->except(['imageEdit']));
       }
       return back()->with('message', strval($request->id).strval(rand()));
    }

    public function auto_correct_wo_redirect() {
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
        foreach ($exams as $key=>$exam) {
            // Tambah ke array (ambil yg pilgan saja)
            if($exam->is_essay == false) {
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
            else if($exam->is_essay == true) {
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
        Overview::updateOrcreate(
            [
                'participant_id' => $data->participant_id,
                'subject_id' => $data->subject_id,      
            ],
            [
                'answer_id' => $data->id,
                // Nanti diubah jadi banyak yang total benar be
                'multiple_choice_correct' => $correctAnswered,
                'temporary_mark' => $totalPoints,
            ]
        );
        
        Answer::where('id', $data->id)->update([

            'correction_status' => $correction_status,
            'is_correct' => $is_correct,
            'mark' => $all_mark,
        ]);
        
    }
   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy_soal(SoalUpdateRequest $request)
    {
        $data = Exam::find($request->id);
        $data->delete();
        return back();
    }


    public function all_peserta() {
        $user = User::where('is_admin', false)->get();
        return Inertia::render('Admin/ParticipantPage', [
            'title' => "Daftar Peserta",
            'user' => $user,
            // 'status' => session('status'),
        ]);
    }

    public function store_peserta(Request $request)
    {
        $request->validate([
            'name' => "required|string|min:2|max:30",
            'nim' => "nullable|unique:users",
            'email' => "nullable||string|email:unique|max:40|unique:users",
            "password" => ['required', 'confirmed', Rules\Password::defaults()],
            "can_access_tryout_until" => "required|date"
       ]);

       $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'nim' => $request->nim,
        'password' => Hash::make($request->password),
        'can_access_tryout_until' => $request->can_access_tryout_until
        ]);

        event(new Registered($user));
        return back()->with('message', 'Berhasil Menambahkan Peserta');
    }

    /**
     * Display the specified resource.
     */


    public function update_peserta(Request $request): RedirectResponse
    {
        // ddd($request->query->get('name'));
        $query = $request->query->all();
        $validatedData = validator($query, [
        'name' => "required|string|min:2|max:30",
        'nim' => [
            'nullable',
            'unique:users,nim,' .$request->query->get('id')
        ],
        'email' => "nullable|string|email:unique|max:40|",
        "password" => ['nullable', 'confirmed', Rules\Password::defaults()],
        "can_access_tryout_until" => "required|date"
        ])->validate();
        
        if($request->query->get('password') != "") {
            $validatedData['password'] = Hash::make($request->query->get('password'));
        } else {
            unset($validatedData['password']);
        }
            
        $validatedData['password'] = Hash::make($request->query->get('password'));
        User::where('id', $request->query->get('id'))
            ->update($validatedData);

        return Redirect::route('admin.peserta')->with('message', 'Peserta  Berhasil Diupdate');
    }

    public function destroy_peserta(Request $request)
    {
        User::destroy($request->id);
        return Redirect::route('admin.peserta')->with('message', 'Peserta Berhasil Dihapus');
    }


    //    Overview
    public function overview()
    {
        // Berdasarkan Peserta
        $user = User::where('is_admin', false)->with('answered')->get();
        // $answer = Answer::get();
        return Inertia::render('Admin/OverviewPage', [
            'title' => "Daftar Peserta",
            'user' => $user,
            // 'answer' => $answer,
            // 'status' => session('status'),
        ]);
    }

    // Show Answer
    public function overview_subject(Request $request)
    {
        // ddd($request->user_id);
        // Berdasarkan Subject dari Peserta dan overview nilai
        $overviews = Overview::where('participant_id', $request->user_id)->with('subject')->get();
        $participant = User::find($request->user_id);
        return Inertia::render('Admin/AnsweredSubject', [
            'title' => "Materi Soal ",
            'participant' => $participant,
            'overviews' => $overviews
            // 'status' => session('status'),
        ]);
    }


    public function review_exam(Request $request) {
        // dd($request->name);

        $exams = Exam::where('subject_id', $request->subject_id)->get();
        $essay_count = Exam::where('subject_id', $request->subject_id)
                        ->where('is_essay', true)->count();
        $answer = Answer::find($request->answer_id);
        $overviews = Overview::find($request->overview_id);
        return Inertia::render('Admin/ReviewExam', [
            'title' => "Soal",
            'overview' => $overviews,
            'answered' => $answer,
            'exams' => $exams,
            'subject' => $request->name,
            'subjectId' => $request->subject_id,
            'essayCount' => $essay_count,

            // 'status' => session('status'),
        ]);
    }

    public function update_overview(Request $request) {
        // ddd($request->essay_correct);
        $validated = $request->validate([
            'subject_id' => "required|integer",
            'participant_id' => "required|integer",
            'essay_correct' => "required|integer",
            'essay_mark' => "required",
            "final_mark" => "required",
            "multiple_choice_correct" => "required|integer",
       ]);



        Overview::where('id', $request->id)
            ->update($validated);
        Answer::where('id', $request->answer_id)
            ->update([
                'correction_status' => $request->correction_status,
                'is_correct' => $request->is_correct,
                'mark' => $request->mark,
                // Mark nanti
            ]);

        return back()->with('message', 'Nilai Peserta Berhasil Diupdate');
    }


}