<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Overview>
 */
class OverviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'student_id' => fake()->random_int(1, 5),
        'exam_id' => fake()->random_int(1, 50),
        'is_correct' => fake()->boolean(),
        'mark' => fake()->randomFloat(1, 60, 100),
        'average_mark' => fake()->randomFloat(1, 60, 100),
        'final_mark' => fake()->randomFloat(1, 60, 100),
        ];
    }
}