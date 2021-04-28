<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Validator;

class ServiceController extends Controller
{
    public function getServices()
    {
        $services = Service::all();

        return response()->json([
            'message' => 'Services successfully returned',
            'services' => $services
        ], 201);
    }
    public function getService(Request $request)
    {
        $service = Service::findOrFail($request->id);

        return response()->json([
            'message' => 'Service successfully returned',
            'service' => $service
        ], 201);
    }
    public function createService(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2',
            'price' => 'required|numeric',
            'service_length' => 'required|integer',
            'employee_id' => 'required|exists:employees,id',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $service = Service::create($validator->validated());

        return response()->json([
            'message' => 'Service successfully updated',
            'service' => $service
        ], 201);
    }
    public function updateService(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2',
            'price' => 'required|numeric',
            'service_length' => 'required|integer',
            'employee_id' => 'required|exists:employees,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $service = Service::findOrFail($request->id);

        $service->update($validator->validated());

        return response()->json([
            'message' => 'Service successfully updated',
            'service' => $service
        ], 201);
    }
    public function getServicesByEmployee(Request $request)
    {
        $services = Service::where('employee_id',$request->employee_id)->get();

        return response()->json([
            'message' => 'Services successfully returned',
            'services' => $services
        ], 201);
    }
    public function deleteService(Request $request)
    {
        $service = Service::findOrFail($request->id);

        $service->delete();

        return response()->json([
            'message' => 'Service successfully deleted',
            'services' => $service
        ], 201);
    }
}
