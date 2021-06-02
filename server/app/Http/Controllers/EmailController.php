<?php

namespace App\Http\Controllers;

use App\Mail\ReminderMail;
use App\Models\History;
use App\Models\User;
use App\Models\Visit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function SendEmails(){
        $currentTime = Carbon::now();
        $visits = Visit::all();
        $latestRecord = History::orderBy('created_at', 'desc')->first();
        $lastAdded = new Carbon($latestRecord->created_at);
        $diff = $currentTime->diffInHours($lastAdded);
        if($diff > 24) {
            $mailRecord = new History();
            $mailRecord->info = "zrobione";
            $mailRecord->save();
            foreach($visits as $vis){
                $visitTime = new Carbon($vis->start);
                $diff = $currentTime->diffInHours($visitTime);
                $flag = 0;
                if($diff < 24){
                    $user = User::findOrFail($vis->user_id);
                    Mail::to($user->email)->send(new ReminderMail($vis, $user));
                    $flag = 1;
                }
            }
            if($flag == 0){
                return response()->json([
                    'message' => 'There are no visits to be reminded about',
                ]);
            }
            return response()->json([
                'message' => 'Reminder mails successfully sent',
            ]);
        }
        else{
            return response()->json([
                'message' => 'Mails were already sent less than 24h ago',
            ]);
        }
    }
}
