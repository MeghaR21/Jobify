<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;  
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Ajouter un utilisateur normal
        User::create([
            'name' => 'Alain',
            'email' => 'alain.aziz-gbadamasssi@epitech.eu',
            'password' => Hash::make(env('ADMIN_PASSWORD', 'default_password')), // Mot de passe dans .env
            'role' => 'admin', // Assuming you have a role field
        ]);

        \App\Models\User::factory(10)->create();
    }
}
