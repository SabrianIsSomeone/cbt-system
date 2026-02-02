<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Answer extends Model
{
    use HasFactory;
    
    protected $guarded = [
        'id',
    ];

    protected $with = ['subject'];

    // Choice jadi array
    protected $casts = [
        'answer' => 'array',
        'correction_status' => 'array',
        'mark' => 'array',
        'is_correct' => 'array'
    ];

    public function student()
    {
        return $this->belongsTo(User::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }    

    public function scopeNonEssay($query)
    {
    return $query->where('answer->is_essay', false);
    }
    

    public function scopeCorrect($query)
    {
        return $query->whereRaw('JSON_CONTAINS(answer->choices, exam.actual_answer)');
    }



}