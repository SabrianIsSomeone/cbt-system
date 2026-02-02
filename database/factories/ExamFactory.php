<?php

namespace Database\Factories;
use DateTime;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exam>
 */
class ExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $choice = fake()->words(5);
        
        return [           
            'question' => fake()->sentence(20),
            'choice' => $choice,
            'is_essay' => fake()->boolean(),
            'actual_answer' => $choice[array_rand($choice)],
        ];
    }
}