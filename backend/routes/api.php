<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ApplicationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route pour s'enregistrer et pour se login
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Route APi ressource
Route::apiResource('advertisements', AdvertisementController::class);
Route::apiResource('companies', CompanyController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('applications', ApplicationController::class);

//routes qui necessitent pas d'authentification
Route::get('/advertisements_list', [AdvertisementController::class, 'index']);         // Fetch all advertisements
Route::get('/advertisements_show/{id}', [AdvertisementController::class, 'show']);      // Fetch a specific advertisement
Route::get('/companies_list', [CompanyController::class, 'index']);          // Fetch all companies
Route::get('/companies_show/{id}', [CompanyController::class, 'show']);

//la route application-create ne neccesite pas d'authentification
Route::post('/applications_create', [ApplicationController::class, 'store']); // POST /applications

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
   

    //route pour la table advertisements
   
    Route::post('/advertisements_create', [AdvertisementController::class, 'store']);         // Post a new advertisement
    Route::put('/advertisements_update/{id}', [AdvertisementController::class, 'update']);  // Update an existing advertisement
    Route::delete('/advertisements_delete/{id}', [AdvertisementController::class, 'destroy']); // Delete an advertisement

    //route pour la table companies
        // Show a specific company
    Route::post('/companies_create', [CompanyController::class, 'store']);         // Create a new company
    Route::put('/companies_update/{company}', [CompanyController::class, 'update']); // Update a company
    Route::delete('/companies_delete/{company}', [CompanyController::class, 'destroy']); // Delete a company

    //route pour la table application
    Route::get('/applications_list', [ApplicationController::class, 'index']); // GET /applications
    Route::get('/applications_show/{id}', [ApplicationController::class, 'show']); // GET /applications/{id}
    Route::put('/applications_update/{id}', [ApplicationController::class, 'update']); // PUT /applications/{id}
    Route::delete('/applications_delete/{id}', [ApplicationController::class, 'destroy']); // DELETE /applications/{id}



     //route pour la table users
     // Index: Get all users
    Route::get('/users_list', [UserController::class, 'index']);

    // Show: Get a specific user by ID
    Route::get('/users_show/{id}', [UserController::class, 'show']);

    // Update: Update a specific user by ID
    Route::put('/users_update/{id}', [UserController::class, 'update']);

    // Destroy: Delete a specific user by ID
    Route::delete('/users_delete/{id}', [UserController::class, 'destroy']);







    // Creer les routes pour l'admin
        
});

