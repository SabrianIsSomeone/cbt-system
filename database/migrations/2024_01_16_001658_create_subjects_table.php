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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->dateTime('exam_started');
            $table->dateTime('exam_ended');
            $table->integer('exam_duration'); //in minutes
            $table->string('image')->nullable(); //path
            $table->boolean('is_available')->default(true)->nullable();
            $table->string('exam_type')->default('normal');
            $table->string('exam_dir')->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};