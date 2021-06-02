<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sms extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'visit_id',
        'visit_date',
        'employee_name',
        'employee_second_name',
        'employee_profession'
    ];
}
