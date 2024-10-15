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
            'first_name' => 'Alain',
            'last_name' => 'AZIZ GBADAMASSI',
            'phone'  => '0784674911',
            'email' => 'alain.aziz-gbadamasssi@epitech.eu',
            'password' => Hash::make(env('ADMIN_PASSWORD', 'default_password')), // Mot de passe dans .env
            'role' => 'admin', // Assuming you have a role field
        ]);

        User::create([
            'first_name' => 'Claire',
            'last_name' => 'DUPONT',
            'phone' => '+33612345678',
            'email' => 'claire.dupont@recruteur.com',
            'password' => Hash::make('password'),
            'role' => 'recruiter',
            'company_id' => 1, // Remplacez par l'ID de l'entreprise
        ]);
        
        User::create([
            'first_name' => 'Julien',
            'last_name' => 'MARTIN',
            'phone' => '+33623456789',
            'email' => 'julien.martin@recruteur.com',
            'password' => Hash::make('password'),
            'role' => 'recruiter',
            'company_id' => 2, // Remplacez par l'ID de l'entreprise
        ]);
        
        User::create([
            'first_name' => 'Sophie',
            'last_name' => 'LEFEBVRE',
            'phone' => '+33634567890',
            'email' => 'sophie.lefebvre@recruteur.com',
            'password' => Hash::make('password'),
            'role' => 'recruiter',
            'company_id' => 3, // Remplacez par l'ID de l'entreprise
        ]);
        
        User::create([
            'first_name' => 'Michel',
            'last_name' => 'GIRAUD',
            'phone' => '+33645678901',
            'email' => 'michel.giraud@recruteur.com',
            'password' => Hash::make('password'),
            'role' => 'recruiter',
            'company_id' => 4, // Remplacez par l'ID de l'entreprise
        ]);
        
        User::create([
            'first_name' => 'Marie',
            'last_name' => 'MOREAU',
            'phone' => '+33656789012',
            'email' => 'marie.moreau@recruteur.com',
            'password' => Hash::make('password'),
            'role' => 'recruiter',
            'company_id' => 5, // Remplacez par l'ID de l'entreprise
        ]);
        
        User::create([
            'first_name' => 'Thomas',
            'last_name' => 'LAMY',
            'phone' => '+33667890123',
            'email' => 'thomas.lamy@recruteur.com',
            'password' => Hash::make('password'),
            'role' => 'recruiter',
            'company_id' => 6, // Remplacez par l'ID de l'entreprise
        ]);
        
        User::create([
            'first_name' => 'Emilie',
            'last_name' => 'FAURE',
            'phone' => '+33678901234',
            'email' => 'emilie.faure@recruteur.com',
            'password' => Hash::make('password'),
            'role' => 'recruiter',
            'company_id' => 7, // Remplacez par l'ID de l'entreprise
        ]);
        
        User::create([
            'first_name' => 'Antoine',
            'last_name' => 'JACQUOT',
            'phone' => '+33689012345',
            'email' => 'antoine.jacquot@recruteur.com',
            'password' => Hash::make('password'),
            'role' => 'recruiter',
            'company_id' => 8, // Remplacez par l'ID de l'entreprise
        ]);
        
        User::create([
            'first_name' => 'Laure',
            'last_name' => 'GOULET',
            'phone' => '+33690123456',
            'email' => 'laure.goulet@recruteur.com',
            'password' => Hash::make('password'),
            'role' => 'recruiter',
            'company_id' => 9, // Remplacez par l'ID de l'entreprise
        ]);
        
        User::create([
            'first_name' => 'Victor',
            'last_name' => 'BENOIT',
            'phone' => '+33601234567',
            'email' => 'victor.benoit@recruteur.com',
            'password' => Hash::make('password'),
            'role' => 'recruiter',
            'company_id' => 10, // Remplacez par l'ID de l'entreprise
        ]);



        //candidate example

        User::create([
            'first_name' => 'Alice',
            'last_name' => 'DURAND',
            'phone' => '+33623456789',
            'email' => 'alice.durand@candidat.com',
            'password' => Hash::make('password'),
            'role' => 'candidate',
        ]);
        
        User::create([
            'first_name' => 'David',
            'last_name' => 'LEROY',
            'phone' => '+33634567890',
            'email' => 'david.leroy@candidat.com',
            'password' => Hash::make('password'),
            'role' => 'candidate',
        ]);
        
        User::create([
            'first_name' => 'Laura',
            'last_name' => 'TISSIER',
            'phone' => '+33645678901',
            'email' => 'laura.tissier@candidat.com',
            'password' => Hash::make('password'),
            'role' => 'candidate',
        ]);
        
        User::create([
            'first_name' => 'Lucas',
            'last_name' => 'NOEL',
            'phone' => '+33656789012',
            'email' => 'lucas.noel@candidat.com',
            'password' => Hash::make('password'),
            'role' => 'candidate',
        ]);
        
        User::create([
            'first_name' => 'Nina',
            'last_name' => 'BESSON',
            'phone' => '+33667890123',
            'email' => 'nina.besson@candidat.com',
            'password' => Hash::make('password'),
            'role' => 'candidate',
        ]);
        
        User::create([
            'first_name' => 'Kevin',
            'last_name' => 'BLANC',
            'phone' => '+33678901234',
            'email' => 'kevin.blanc@candidat.com',
            'password' => Hash::make('password'),
            'role' => 'candidate',
        ]);
        
        User::create([
            'first_name' => 'Ines',
            'last_name' => 'MARCHAND',
            'phone' => '+33689012345',
            'email' => 'ines.marchand@candidat.com',
            'password' => Hash::make('password'),
            'role' => 'candidate',
        ]);
        
        User::create([
            'first_name' => 'Maxime',
            'last_name' => 'CARRIERE',
            'phone' => '+33690123456',
            'email' => 'maxime.carriere@candidat.com',
            'password' => Hash::make('password'),
            'role' => 'candidate',
        ]);
        
        User::create([
            'first_name' => 'Alice',
            'last_name' => 'ROGER',
            'phone' => '+33601234567',
            'email' => 'alice.rogers@candidat.com',
            'password' => Hash::make('password'),
            'role' => 'candidate',
        ]);
        
        User::create([
            'first_name' => 'Simon',
            'last_name' => 'PERROT',
            'phone' => '+33612345678',
            'email' => 'simon.perrot@candidat.com',
            'password' => Hash::make('password'),
            'role' => 'candidate',
        ]);
    }
}
