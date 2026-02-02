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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nim')->unique()->nullable();
            $table->boolean('is_admin')->default(false);
            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->integer('phone')->nullable();
            $table->string('profil_pic')->nullable();
            $table->string('password');
            $table->string('exam_currently_doing')->nullable();
            $table->boolean('is_doing_exam')->default(false);
            $table->dateTime('can_access_tryout_until')->default("2024-11-29 23:00:00");
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};