<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Exam;
use Illuminate\Support\Facades\DB;
class ExamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           // Buat Data Soal Exam
        Exam::factory(50)->create([
            'subject_id' => 1,
            // 'subject' => "Subject_1",
            // 'exam_started' => "2024-01-04 08:00:00",
            // 'exam_ended' => "2024-01-15 23:00:00",
            // 'exam_duration' => 120,

        ]);

        Exam::factory(40)->create([
            'subject_id' => 2,
            // 'subject' => "Subject_2",
            // 'exam_started' => "2024-01-06 08:00:00",
            // 'exam_ended' => "2024-01-16 23:00:00",
            // 'exam_duration' => 90,

        ]);

        Exam::factory(50)->create([
            'subject_id' => 3,
            // 'subject' => "Subject_3",
            // 'exam_started' => "2024-01-09 08:00:00",
            // 'exam_ended' => "2024-01-17 23:00:00",
            // 'exam_duration' => 120,
        ]);

        // Exam::factory(25)->create([
        //     'subject_id' => 4,
        //     'subject' => "Subject_4",
        //     'exam_started' => "2024-01-09 08:00:00",
        //     'exam_ended' => "2024-01-18 23:00:00",
        //     'exam_duration' => 60,
        // ]);
        
        DB::table('exams')->insert([
            [
                'subject_id' => 4,
                'point' => 10,
                'question' => "234567",
                'choice' => '["2", "3", "4", "9", "5"]',
                'image' => null,
                'is_essay' => false,
                'actual_answer' => "9",
            ],
            [
                'subject_id' => 4,
                'point' => 10,
                'question' => "234567",
                'choice' => '["2", "9", "4", "5", "6"]',
                'image' => null,
                'is_essay' => false,
                'actual_answer' => "9",
            ],
            [
                'subject_id' => 4,
                'point' => 10,
                'question' => "234567",
                'choice' => '["9", "3", "4", "5", "7"]',
                'image' => null,
                'is_essay' => false,
                'actual_answer' => "9",
            ],
            [
                'subject_id' => 4,
                'point' => 10,
                'question' => "234567",
                'choice' => '["2", "3", "9", "5", "4"]',
                'image' => null,
                'is_essay' => false,
                'actual_answer' => "9",
            ],

        ]);

       
    }
}