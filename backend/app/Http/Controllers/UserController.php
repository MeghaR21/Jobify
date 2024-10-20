<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class UserController extends Controller
{
    //
    // Fetch all users (GET /users)
    public function index()
    {
        try{
            $users= User::all(); 
            return response()->json($users);
        }catch(Exception $e) {
            return response()->json(['error' => 'Failed to fetch users', 'message' => $e->getMessage()], 500);
        }
        
    }



    // Fetch a single user (GET /users/{id})
    public function show($id)
    {
        try {
            $user = User::findOrFail($id);
            return response()->json($user, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch user', 'message' => $e->getMessage()], 500);
        }
    }



    // ---------------------Update a user (PUT /users/{id})------------//
    public function update(Request $request, $id)
    {
        try {
            // Validation of request data
            $validatedData = $request->validate([
                'first_name' => 'sometimes|string|max:255',
                'last_name' =>  'sometimes|string|max:255',
                'phone' => 'sometimes|string|unique:users,phone,'.$id.'|regex:/^\+?[0-9]{1,4}?[-. ]?(\(?\d{1,3}?\)?[-. ]?)?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/',
                'email' => 'sometimes|string|email|max:255|unique:users,email,'.$id.'|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
                'password' => 'sometimes|string|min:8', // Optional password validation
            ]);

            $user = User::findOrFail($id);

            // Hash the password if it is being updated
            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']); // Use Hash::make for consistency
            } else {
                unset($validatedData['password']); // Remove password field if not being updated
            }

            $user->update($validatedData);

            return response()->json(['message' => 'User updated successfully!', 'data' => $user], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update user', 'message' => $e->getMessage()], 500);
        }
    }

    // Delete a user (DELETE /users/{id})
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json(['message' => 'User deleted successfully!'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to delete user', 'message' => $e->getMessage()], 500);
        }
    }

    public function register(Request $request)
    {
        // Valider les données entrantes
        $validatedData = $request->validate([
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            
        ]);

        // Créer un nouvel utilisateur
        $user = User::create([
            'last_name' => $validatedData['last_name'],
            'first_name'=>$request->first_name,
            'phone'=>$request->phone,
            'email' => $validatedData['email'],
            'password' => Hash::make(Str::random(8)),
        ]);

        // Retourner une réponse JSON (utile pour AJAX)
        return response()->json([
            'message' => 'Utilisateur créé avec succès',
            'user' => $user
        ], 201);
    }
}
