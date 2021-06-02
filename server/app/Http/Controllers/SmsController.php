<?php

namespace App\Http\Controllers;
use App\Models\Visit;
use App\Models\Sms;
use App\Models\Employee;
use Illuminate\Http\Request;

class SmsController extends Controller
{
    public function sendSms($id){
        $smses = Sms::all();
        foreach($smses as $sms){
            $sms->delete();
        }
        $visits = Visit::where('user_id', $id)->get();
        foreach($visits as $visit){
            $singleSms = new Sms;
            $singleSms->user_id = $id;
            $singleSms->visit_id = $visit->id;
            $singleSms->visit_date = $visit->start;
            $employee = Employee::findOrFail($visit->employee_id);
            $singleSms->employee_name = $employee->firstName;
            $singleSms->employee_second_name = $employee->lastName;
            $singleSms->employee_profession = $employee->profession;
            $singleSms->save();
        }
        $smses = Sms::where('user_id', $id)->get();
        return response()->json([
            'message' => 'Smses successfully sent',
            'smses' => $smses
        ], 201);
    }
}