<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('overviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participant_id');
            $table->foreignId('answer_id');
            $table->foreignId('subject_id');
            $table->boolean('multiple_choice_correct');
            $table->double('temporary_mark');
            $table->boolean('essay_correct')->nullable();
            $table->double('essay_mark')->nullable();
            $table->double('average_mark')->nullable();
            $table->double('final_mark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('overviews');
    }
};