<?php

use App\Http\Controllers\EmailController;
use App\Http\Controllers\OpinionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CabinetController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\SmsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Logowanie i rejestracja
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

//Gabinety
Route::group([
    'middleware' => 'is.admin',
], function($router){
    Route::post('/cabinet',[CabinetController::class,'createCabinet']);
    Route::put('/cabinet/{id}',[CabinetController::class,'updateCabinet']);
    Route::delete('/cabinet/{id}',[CabinetController::class,'destroyCabinet']);
});

Route::group([
], function($router){
    Route::get('/cabinets',[CabinetController::class,'getCabinets']);
    Route::get('/cabinet/{id}',[CabinetController::class,'getSingleCabinet']);
});

//Pracownicy
Route::group([
    'middleware' => 'is.admin',
], function($router){
    Route::post('/employee',[EmployeeController::class,'createEmployee']);
    Route::put('/employee/{id}',[EmployeeController::class,'updateEmployee']);
    Route::delete('/employee/{id}',[EmployeeController::class,'deleteEmployee']);
});

Route::group([
], function($router){
    Route::get('/employees',[EmployeeController::class,'getEmployees']);
    Route::get('/employee/{id}',[EmployeeController::class,'getEmployee']);
});

//Usługi
Route::group([
    'middleware' => 'is.admin',
], function($router){
    Route::post('/service',[ServiceController::class,'createService']);
    Route::put('/service/{id}',[ServiceController::class,'updateService']);
    Route::delete('/service/{id}',[ServiceController::class,'deleteService']);
});

Route::group([
], function($router){
    Route::get('/services',[ServiceController::class,'getServices']);
    Route::get('/service/{id}',[ServiceController::class,'getService']);
    Route::get('/services-by-employee/{employee_id}',[ServiceController::class,'getServicesByEmployee']);
});

// Wizyty
Route::group([
    'middleware' => 'is.admin',
], function($router){
    Route::get('/visits',[VisitController::class,'getVisits']);
    Route::put('/visit/{id}',[VisitController::class,'updateIsPaid']);
});

Route::group([
], function($router){
    Route::get('/visit/{id}',[VisitController::class,'getSingleVisit']);
    Route::post('/visit',[VisitController::class,'createVisit']);
    Route::delete('/visit/{id}',[VisitController::class,'destroyVisit']);
    Route::post('/dailyVisits',[VisitController::class,'getDailyVisits']);
});
// Maile
Route::group([
    // 'middleware' => 'is.admin',
], function($router){
    Route::post('/emails',[EmailController::class,'sendEmails']);
});
// Opinie
Route::group([
], function($router){
    Route::post('/opinion',[OpinionController::class,'createOpinion']);
    Route::get('/opinions/{id}',[OpinionController::class,'getEmployeeOpinions']);
});

// Smsy
Route::get('/sms/{id}',[SmsController::class,'sendSms']);

