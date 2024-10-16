<?php

namespace App\Http\Controllers;


use App\Models\Application;
use App\Models\Unregistereduser;
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
            $applications = Application::with(['user', 'unregistereduser'])->get();
            return response()->json($applications);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch applications'], 500);
        }
    }

    // Store a new application (POST /applications)
    public function store(Request $request)
    {
        try {
            // Validation of request data
            $validatedData = $request->validate([
            'advertisement_id' => 'required|exists:advertisements,id',
            'user_id' => 'sometimes|exists:users,id',
            'unregistereduser_id' =>'required_without:user_id',
            'message' => 'required|string',
            'first_name' => 'required_without:user_id|string|max:255',
            'email' => 'nullable|string|email|unique:unregistered_users,email|max:255|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
            'last_name' => 'required_without:user_id|string|max:255',
            'phone' => 'required_without:user_id|string|unique:unregistered_users,phone|regex:/^\+?[0-9]{1,4}?[-. ]?(\(?\d{1,3}?\)?[-. ]?)?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/',

        
            ]);

                // Vérifier si l'utilisateur est connecté
            if (!empty($validatedData['user_id'])) {
                // Utilisateur connecté
                Application::create([
                    'message' => $validatedData['message'],
                    'user_id' => $validatedData['user_id'], // Associer l'utilisateur connecté
                    'advertisement_id' => $validatedData['advertisement_id'],
                ]);
                return response()->json(['message' => 'Application created successfully!'], 201);
            } else {
                // Utilisateur non connecté
                $unregisteredData = $unregisteredData = [
                    'first_name' => $validatedData['first_name'],
                    'last_name' => $validatedData['last_name'],
                    'email' => $validatedData['email'] ?? null,
                    'phone' => $validatedData['phone'],
                ];

                // Vérifier si l'utilisateur non enregistré existe déjà
                $existingUser = Unregistereduser::where('phone', $unregisteredData['phone'])->first();

                if ($existingUser) {
                    // Créer une candidature associée à l'utilisateur existant
                    Application::create([
                        'message' => $validatedData['message'],
                        'unregistered_user_id' => $existingUser->id,
                        'advertisement_id' => $validatedData['advertisement_id'],
                    ]);
                    return response()->json(['message' => 'Application created successfully!'], 201);
                } else {
                    // Créer un nouvel utilisateur non enregistré
                    $newUser = Unregistereduser::create($unregisteredData);
                    Application::create([
                        'message' => $validatedData['message'],
                        'unregistereduser_id' => $newUser->id,
                        'advertisement_id' => $validatedData['advertisement_id'],
                    ]);
                    return response()->json(['message' => 'Application created successfully!'], 201);
                }
            }
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
 
     // Update an application (PUT /applications/{id})  // techniquement j'ai pas besoin de ca
     public function update(Request $request, $id)
    {
        try {
            // Validation of request data
            $validatedData = $request->validate([
            'advertisement_id' => 'required|exists:advertisements,id',
            'user_id' => 'sometimes|exists:users,id',
            'unregistereduser_id' => 'sometimes|exists:unregistereduser,id',
            'message' => 'nullable|string'
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
