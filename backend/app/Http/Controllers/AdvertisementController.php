<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;


class AdvertisementController extends Controller
{

    //get all the informations ahahahhaaahaha
    public function index()
    {
        try {
            $advertisements = Advertisement::with('company')->get(); // renvoie aussi les informations de l'entrprises associée
            return response()->json($advertisements, 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch advertisements'], 500);
        }
    }

    // Poster une nouvelle annonce
    public function store(Request $request) 
    {
        try {
            // Validation des données
            $validatedData = $request->validate([
                'job_title' => 'required|string|max:255',
                'location' => 'required|string',
                'salary' => 'nullable|numeric',
                'contract_type' => 'nullable|string',
                'full_description' => 'required|string',
                'description' => 'required|string',
                'company_id' => 'required|exists:companies,id',
                'user_id'=>'nullable|exists:users,id',
            ]);

            // Création de l'annonce
            $advertisement = Advertisement::create([
                'job_title' => $validatedData['job_title'],
                'description' => $validatedData['description'],
                'full_description' => $validatedData['full_description'],
                'location' => $validatedData['location'],
                'contract_type' => $validatedData['contract_type'],
                'salary' => $validatedData['salary'],
                'user_id' => $validatedData['user_id'],
                'company_id' => $validatedData['company_id'],
            ]);

            return response()->json(['message' => 'Advertisement created succesfully !', 'data' => $advertisement], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to create advertisement', 'message' => $e->getMessage()], 500);
        }
          
    }

    // Fetch a single advertisement (GET /advertisements/{id})
    public function show($id)
    {
        try {
            $advertisement = Advertisement::findOrFail($id);
            return response()->json($advertisement, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Advertisement not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch advertisement'], 500);
        }
    }

    // Update an advertisement (PUT /advertisements/{id})
    public function update(Request $request,$id)
    {
        try{
            $validatedData = $request->validate([
                'job_title' => 'required|string|max:255',
                'location' => 'required|string',
                'salary' => 'nullable|numeric',
                'contract_type' => 'nullable|string',
                'description' => 'required|string',
                'company_id' => 'required|exists:companies,id',
                'user_id'=>'required|exists:users,id',
            
            ]);
            // Find the advertisement by ID
            $advertisement = Advertisement::findOrFail($id);

            $advertisement->update($validatedData);
    
            return response()->json(['message' => 'Advertisement edited with success !', 'data' => $advertisement], 200);

        }catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Advertisement not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update advertisement', 'message' => $e->getMessage()], 500);
        }
        
    }

    public function destroy($id)
    {
        try {
            $advertisement = Advertisement::findOrFail($id);
            $advertisement->delete();

            return response()->json(['message' => 'Advertisement deleted successfully!'], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Advertisement not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to delete advertisement', 'message' => $e->getMessage()], 500);
        }
    }
}
