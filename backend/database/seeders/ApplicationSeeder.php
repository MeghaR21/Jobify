<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Application;
use App\Models\User;
use App\Models\Advertisement;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // Retrieve users with the role of candidate
        $candidates = User::where('role', 'candidate')->get();

        // Check if there are any candidate users
        if ($candidates->isEmpty()) {
            $this->command->error('No users with the candidate role found. Please create one before running the seeder.');
            return; // Stop execution if no candidates are found
        }

        // Retrieve existing advertisements
        $advertisements = Advertisement::all();

        // Create applications
        Application::create([
            'message' => 'I am very interested in this position, and I believe my skills are a perfect match.',
            'user_id' => $candidates->random()->id,
            'advertisement_id' => $advertisements->random()->id,
        ]);

        Application::create([
            'message' => 'I am passionate about software development and would love to join your team.',
            'user_id' => $candidates->random()->id,
            'advertisement_id' => $advertisements->random()->id,
        ]);

        Application::create([
            'message' => 'I would like to apply for this position because I believe I can bring a lot to your company.',
            'user_id' => $candidates->random()->id,
            'advertisement_id' => $advertisements->random()->id,
        ]);

        Application::create([
            'message' => 'I have the necessary experience and am very motivated to join your team.',
            'user_id' => $candidates->random()->id,
            'advertisement_id' => $advertisements->random()->id,
        ]);

        Application::create([
            'message' => 'My professional background has prepared me for this role, and I look forward to discussing it further.',
            'user_id' => $candidates->random()->id,
            'advertisement_id' => $advertisements->random()->id,
        ]);

        Application::create([
            'message' => 'I am confident that I can make a significant contribution to your company.',
            'user_id' => $candidates->random()->id,
            'advertisement_id' => $advertisements->random()->id,
        ]);

        Application::create([
            'message' => 'I believe this position is perfect for me, and I would like the opportunity to discuss it.',
            'user_id' => $candidates->random()->id,
            'advertisement_id' => $advertisements->random()->id,
        ]);

        Application::create([
            'message' => 'I am eager to put my skills to work for your team.',
            'user_id' => $candidates->random()->id,
            'advertisement_id' => $advertisements->random()->id,
        ]);

        Application::create([
            'message' => 'This role aligns perfectly with my career aspirations, and I am very motivated.',
            'user_id' => $candidates->random()->id,
            'advertisement_id' => $advertisements->random()->id,
        ]);

        Application::create([
            'message' => 'I am ready to take on new challenges and contribute to your projects.',
            'user_id' => $candidates->random()->id,
            'advertisement_id' => $advertisements->random()->id,
        ]);
    }
}
