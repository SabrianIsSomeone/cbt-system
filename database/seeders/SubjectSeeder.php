<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subject::create([
            'name' => "Subject_1",
            'exam_started' => "2024-01-04 00:00:00",
            'exam_ended' => "2024-09-28 23:59:59",
            'exam_duration' => 120,
            'exam_dir' => '/polri/psikolog/kecerdasan/akpol',
            'exam_type' => 'normal',
        ]);

        Subject::create([
            'name' => "Subject_2",
            'exam_started' => "2024-01-06 08:00:00",
            'exam_ended' => "2024-01-16 23:00:00",
            'exam_duration' => 90,
            'exam_dir' => '/polri/psikolog/kecerdasan/akpol',
            'exam_type' => 'normal',
        ]);

        Subject::create([
            'name' => "Subject_3",
            'exam_started' => "2024-01-09 08:00:00",
            'exam_ended' => "2024-01-17 23:00:00",
            'exam_duration' => 120,
            'exam_dir' => '/polri/psikolog/kecerdasan/bintara',
            'exam_type' => 'normal',
        ]);

        Subject::create([
            'name' => "Hilang Angka",
            'exam_started' => "2024-01-04 00:00:00",
            'exam_ended' => "2024-09-28 23:59:59",
            'exam_duration' => 1,
            'exam_dir' => '/polri/psikolog/kecerdasan/tamtama',
            'exam_type' => 'hilang angka',
        ]);

        // Subject::factory(25)->create([
        //     'subject_id' => 1,
        //     'subject' => "Subject_4",
        //     'exam_started' => "2024-01-09 08:00:00",
        //     'exam_ended' => "2024-01-18 23:00:00",
        //     'exam_duration' => 60,
        // ]);
    }
}