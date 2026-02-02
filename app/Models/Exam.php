<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Exam extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
    ];

    // Choice jadi array
    protected $casts = [
        'choice' => 'array'
    ];

    public function subject(): HasOne
    {
        return $this->hasOne(Subject::class);
    }

    // public function getCorrectAnswerPoints()
    // {
    // return $this->point;
    // }

    // public function scopeNonEssay($query)
    // {
    // return $query->where('is_essay', false);
    // }

}
