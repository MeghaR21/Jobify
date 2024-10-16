<?php

namespace App\Http\Controllers;

use App\Models\Unregistereduser;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;
use App\Models\Application;



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
 
     // Store a new unregistered user
     public function store(Request $request)
     {
         try {
            $validatedData = $request->validate([
                'first_name' => 'required|string|max:255',
                'email' => 'nullable|string|email|unique:unregisteredusers,email|max:255|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
                'last_name' => 'required|string|max:255',
                'phone' => 'required|string|unique:unregistered_users,phone|regex:/^\+?[0-9]{1,4}?[-. ]?(\(?\d{1,3}?\)?[-. ]?)?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/',
                'advertisement_id' => 'required|exists:advertisements,id',
            ]);

                    // Recherche de l'utilisateur dans la table unregistered_users
            $existingUser = UnregisteredUser::where('phone', $validatedData['phone'])->first();

            if ($existingUser) {
                // Si l'utilisateur existe déjà, créer une application avec cet utilisateur
                Application::create([
                    'message' => $request->input('message'),  // Ajoute ici le message de candidature
                    'unregistered_user_id' => $existingUser->id,  // Associe l'utilisateur existant
                    'advertisement_id' => $validatedData['advertisement_id'],  // Associe l'annonce
                ]);

                return response()->json(['message' => 'User already exists. Application created successfully!'], 201);
            } else {
                // Si l'utilisateur n'existe pas, le créer puis l'associer à une application
                $newUser = UnregisteredUser::create($validatedData);

                Application::create([
                    'message' => $request->input('message'),
                    'unregistered_user_id' => $newUser->id,  // Associe l'utilisateur nouvellement créé
                    'advertisement_id' => $validatedData['advertisement_id'],
                ]);

                return response()->json(['message' => 'User and application created successfully!', 'data' => $newUser], 201);
            }
            
 
             return response()->json(['message' => 'Unregistereduser created successfully!', 'data' => $unregisteredusers], 201);
         } catch (Exception $e) {
             return response()->json(['error' => 'Failed to create unregistereduser', 'message' => $e->getMessage()], 500);
         }
     }
 
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
