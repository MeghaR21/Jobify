<?php

namespace App\Http\Controllers;

use App\Models\Unregistereduser;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;




class UnregistereduserController extends Controller
{
     // Fetch all unregistered users
     public function index()
     {
         try {
            $unregisteredusers = Unregistereduser::all();
            return response()->json($unregisteredusers);
         } catch (Exception $e) {
             return response()->json(['error' => 'Failed to fetch unregistered users'], 500);
         }
     }
 
     // Store a new unregistered user // It 's done in Application controller
    //  public function store(Request $request)
    //  {
    //     try {
    //         $validatedData = $request->validate([
    //             'first_name' => 'required|string|max:255',
    //             'email' => 'required|string|email|unique:unregisteredusers,email|max:255|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
    //             'last_name' => 'required|string|max:255',
    //             'phone' => 'nullable|string|unique:unregistered_users,phone|regex:/^\+?[0-9]{1,4}?[-. ]?(\(?\d{1,3}?\)?[-. ]?)?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/',
    //         ]);

    //         // Création de l'utilisateur non enregistré
    //         $newUnregistereduser = UnregisteredUser::create($validatedData);

    //         return response()->json(['message' => 'User created successfully!', 'data' => $newUnregistereduser], 201);
    //     } catch (Exception $e) {
    //         return response()->json(['error' => 'Failed to create unregistered user', 'message' => $e->getMessage()], 500);
    //     }
        


                    
    //  }
 
     // Fetch one unregistered user by ID
    public function show($id)
    {
        try {
            $unregisteredusers = Unregistereduser::findOrFail($id);
            return response()->json($unregisteredusers, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Unregistereduser not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch unregistereduser'], 500);
        }
    }
 
     // Delete an unregistered user
     public function destroy($id)
     {
         try {
             $unregisteredusers = Unregistereduser::findOrFail($id);
             $unregisteredusers->delete();
 
             return response()->json(['message' => 'Unregistereduser deleted successfully!'], 200);
         } catch (ModelNotFoundException $e) {
             return response()->json(['error' => 'Unregistereduser not found'], 404);
         } catch (Exception $e) {
             return response()->json(['error' => 'Failed to delete Unregistereduser'], 500);
         }
     }

// i didn't create a route for editing unregisteredusers


}
