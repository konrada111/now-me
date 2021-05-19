<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Opinion;
use Illuminate\Http\Request;
use Validator;

class OpinionController extends Controller
{
    public function createOpinion(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'employee_id' => 'required|exists:employees,id',
            'text' => 'required|string|min:2',
            'stars' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $opinion = Opinion::create($validator->validated());

        return response()->json([
            'message' => 'Opinion successfully created',
            'opinion' => $opinion
        ], 201);
    }
    public function getEmployeeOpinions($id){
        $opinions = Opinion::where('employee_id', $id)->get();
        if($opinions->count() < 1){
            return response()->json([
                'message' => 'This employee has no opinions',
            ], 201);
        }
        else{
            return response()->json([
                'message' => 'Opinions successfully returned',
                'opinions' => $opinions
            ], 201);
        }
    }
}
