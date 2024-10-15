<?php

namespace App\Http\Controllers;


use App\Models\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;


class ApplicationController extends Controller
{
    //
     // Fetch all applications (GET /applications)
     public function index()
     {
         try {
             $applications = Application::all();
             return response()->json($applications);
         } catch (Exception $e) {
             return response()->json(['error' => 'Failed to fetch applications', 'message' => $e->getMessage()], 500);
         }
     }
 
     // Store a new application (POST /applications)
     public function store(Request $request)
     {
         try {
             // Validation of request data
             $validatedData = $request->validate([
                'advertisement_id' => 'required|exists:advertisements,id',
                'user_id' => 'nullable|exists:users,id',
                'message' => 'nullable'
 
                 
             ]);
 
             // Create a new application
             $application = Application::create($validatedData);
 
             return response()->json(['message' => 'Application created successfully!', 'data' => $application], 201);
         } catch (Exception $e) {
             return response()->json(['error' => 'Failed to create application', 'message' => $e->getMessage()], 500);
         }
     }
 
     // Fetch a single application (GET /applications/{id})
     public function show($id)
     {
         try {
             $application = Application::findOrFail($id);
             return response()->json($application, 200);
         } catch (ModelNotFoundException $e) {
             return response()->json(['error' => 'Application not found'], 404);
         } catch (Exception $e) {
             return response()->json(['error' => 'Failed to fetch application', 'message' => $e->getMessage()], 500);
         }
     }
 
     // Update an application (PUT /applications/{id})
     public function update(Request $request, $id)
     {
         try {
             // Validation of request data
             $validatedData = $request->validate([
                'advertisement_id' => 'required|exists:advertisements,id',
                'user_id' => 'nullable|exists:users,id',
                'message' => 'nullable'
                
                 
             ]);
 
             $application = Application::findOrFail($id);
             $application->update($validatedData);
 
             return response()->json(['message' => 'Application updated successfully!', 'data' => $application], 200);
         } catch (ModelNotFoundException $e) {
             return response()->json(['error' => 'Application not found'], 404);
         } catch (Exception $e) {
             return response()->json(['error' => 'Failed to update application', 'message' => $e->getMessage()], 500);
         }
     }
 
     // Delete an application (DELETE /applications/{id})
     public function destroy($id)
     {
         try {
             $application = Application::findOrFail($id);
             $application->delete();
 
             return response()->json(['message' => 'Application deleted successfully!'], 200);
         } catch (ModelNotFoundException $e) {
             return response()->json(['error' => 'Application not found'], 404);
         } catch (Exception $e) {
             return response()->json(['error' => 'Failed to delete application', 'message' => $e->getMessage()], 500);
         }
     }
}
