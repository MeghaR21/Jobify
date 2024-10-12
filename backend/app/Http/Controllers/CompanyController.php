<?php

namespace App\Http\Controllers;


use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class CompanyController extends Controller
{
    //
    public function index()
    {
        try {
            $companies = Company::all();
            return response()->json($companies);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch companies', 'message' => $e->getMessage()], 500);
        }
    }

    // Store a new company (POST /companies)
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'nullable|string|email|unique:companies,email|max:255|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
                'address' => 'required|string|max:255',
                'website' => 'required|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|unique:companies,website|max:255',

                
            ]);
            $company = Company::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'address' => $validatedData['address'],
                'website' => $validatedData['website'],
            ]);
    
            return response()->json(['message' => 'Company created successfully!', 'data' => $company], 201);
            
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to create company', 'message' => $e->getMessage()], 500);
        }
    }

   

    // Update a company (PUT /companies/{id})
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'nullable|string|email|max:255|unique:companies,email,'.$id.'|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
                'address' => 'required|string|max:255',
                'website' => 'required|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|unique:companies,website,'.$id.'|max:255',
            ]);

            $company = Company::findOrFail($id);
            $company->update($validatedData);

            return response()->json(['message' => 'Company updated successfully!', 'data' => $company], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Company not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update company', 'message' => $e->getMessage()], 500);
        }
    }

    //fetch one company_id
    public function show($id)
    {
        try {
            $company = Company::findOrFail($id);
            return response()->json($company, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Company not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch company', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $company = Company::findOrFail($id);
            $company->delete();

            return response()->json(['message' => 'Company deleted successfully!'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Company not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to delete company', 'message' => $e->getMessage()], 500);
        }
    }
}
