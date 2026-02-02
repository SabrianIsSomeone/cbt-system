<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    protected $with = ['exam'];
    protected $guarded = [
        'id',
    ];
 
    public function exam()
    {
        return $this->hasMany(Exam::class);
    }

    public function overview()
    {
        return $this->hasMany(Overview::class);
    }
    // public function overview()
    // {
    //     return $this->belongsTo(Overview::class);
    // }
}