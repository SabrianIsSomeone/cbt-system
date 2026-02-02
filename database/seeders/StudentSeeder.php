<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           // Buat Data User
           User::factory()->create([
            'name' => 'Sabrian Maulana',
            'nim' => 'F1E121080',
            'email' => 'sabrian101maulana@gmail.com',
            'password' => bcrypt('Holmes1412'),
            'can_access_tryout_until' => "2024-11-29 23:00:00"
        ]);

        User::factory()->create([
            'name' => 'Raihan Ghani Perangin Angin',
            'nim' => 'F1E121081',
            'email' => 'ghanix@gmail.com',
            'password' => bcrypt('f1e121081'),
            'can_access_tryout_until' => "2024-11-29 23:00:00"
        ]);

        User::factory()->create([
            'name' => 'Akhdan Al-Wafi',
            'nim' => 'F1E121083',
            'email' => 'danko@gmail.com',
            'password' => bcrypt('f1e121083'),
            'can_access_tryout_until' => "2024-11-29 23:00:00"
        ]);

        User::factory()->create([
            'name' => 'Selly Clarisa',
            'nim' => 'F1E121169',
            'email' => 'clarisa@gmail.com',
            'password' => bcrypt('f1e121169'),
            'can_access_tryout_until' => "2024-11-29 23:00:00"
        ]);

        User::factory()->create([
            'name' => 'Kesi Aprilia',
            'nim' => 'F1E121225',
            'email' => 'kesiaprilia@gmail.com',
            'password' => bcrypt('f1e121225'),
            'can_access_tryout_until' => "2024-11-29 23:00:00"
        ]);


        User::factory()->create([
            'name' => 'M Arif Firdaus',
            'nim' => 'F1E121079',
            'email' => 'arifwibu@gmail.com',
            'password' => bcrypt('f1e121079'),
            'can_access_tryout_until' => "2024-11-29 23:00:00"
        ]);

        User::factory()->create([
            'name' => 'M Rizalul Fiqri',
            'nim' => 'F1E121020',
            'email' => 'fiqrijambi@gmail.com',
            'password' => bcrypt('password'),
            'can_access_tryout_until' => "2024-11-29 23:00:00"
        ]);
    }
}