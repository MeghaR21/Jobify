<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;
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
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,'.$id.'|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
                'password' => 'sometimes|string|min:8', // Optional password validation
            ]);

            $user = User::findOrFail($id);

            // Hash the password if it is being updated
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
}
