<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\ExamSeeder;
use Database\Seeders\OverviewSeeder;
use Database\Seeders\StudentSeeder;
use Database\Seeders\AnswerSeeder;
use Database\Seeders\SubjectSeeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin
        User::factory()->create([
            'name' => 'Admin',
            'nim' => 'ID',
            // admin.eranger@gmail.com
            'email' => 'admin@admin.com',
            'password' => bcrypt("password"),
            'is_admin' => true
        ]);

        $this->call([
            StudentSeeder::class,
            OverviewSeeder::class,
            AnswerSeeder::class,
            SubjectSeeder::class,
            ExamSeeder::class,
        ]);
    }
}