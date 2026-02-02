<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Overview extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $with = ['participant', 'subject', 'answered'];

    public function participant()
    {
        return $this->belongsTo(User::class, 'participant_id');
    }


    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function answered()
    {
        return $this->belongsTo(Answer::class, 'answer_id');
    }
}