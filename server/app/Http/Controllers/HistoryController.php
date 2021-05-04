<?php

namespace App\Http\Controllers;

use App\Models\History;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function historyCheck(){
        $currentTime = Carbon::now();
        $latestRecord = History::orderBy('created_at', 'desc')->first();
        $lastAdded = new Carbon($latestRecord->created_at);
        $diff = $currentTime->diffInHours($lastAdded);
        if($diff > 24) {
            $mailRecord = new History();
            $mailRecord->info = "zrobione";
            if($mailRecord->save()){
                return response()->json([
                    'message' => 'Mail history record successfuly created',
                    'mailRecord' => $mailRecord
                ]);
            }
        }
        else{
            return response()->json([
                'message' => 'Mail history record not created',
            ]);
        }
    }
}
