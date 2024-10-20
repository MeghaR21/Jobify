<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::create([
            'name' => 'Google LLC',
            'address' => '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
            'website' => 'https://www.google.com',
            'email' => 'contact@google.com',
        ]);

        Company::create([
            'name' => 'Microsoft Corporation',
            'address' => '1 Microsoft Way, Redmond, WA 98052, USA',
            'website' => 'https://www.microsoft.com',
            'email' => 'info@microsoft.com',
        ]);

        Company::create([
            'name' => 'Apple Inc.',
            'address' => 'One Apple Park Way, Cupertino, CA 95014, USA',
            'website' => 'https://www.apple.com',
            'email' => 'contact@apple.com',
        ]);

        Company::create([
            'name' => 'Amazon.com, Inc.',
            'address' => '410 Terry Ave N, Seattle, WA 98109, USA',
            'website' => 'https://www.amazon.com',
            'email' => 'contact@amazon.com',
        ]);

        Company::create([
            'name' => 'Facebook, Inc. (Meta Platforms, Inc.)',
            'address' => '1 Hacker Way, Menlo Park, CA 94025, USA',
            'website' => 'https://www.facebook.com',
            'email' => 'contact@facebook.com',
        ]);

        Company::create([
            'name' => 'Tesla, Inc.',
            'address' => '3500 Deer Creek Road, Palo Alto, CA 94304, USA',
            'website' => 'https://www.tesla.com',
            'email' => 'info@tesla.com',
        ]);

        Company::create([
            'name' => 'Netflix, Inc.',
            'address' => '100 Winchester Circle, Los Gatos, CA 95032, USA',
            'website' => 'https://www.netflix.com',
            'email' => 'contact@netflix.com',
        ]);

        Company::create([
            'name' => 'IBM Corporation',
            'address' => '1 New Orchard Road, Armonk, NY 10504-1722, USA',
            'website' => 'https://www.ibm.com',
            'email' => 'info@ibm.com',
        ]);

        Company::create([
            'name' => 'Adobe Inc.',
            'address' => '345 Park Avenue, San Jose, CA 95110, USA',
            'website' => 'https://www.adobe.com',
            'email' => 'contact@adobe.com',
        ]);

        Company::create([
            'name' => 'Salesforce.com, Inc.',
            'address' => '415 Mission Street, 3rd Floor, San Francisco, CA 94105, USA',
            'website' => 'https://www.salesforce.com',
            'email' => 'contact@salesforce.com',
        ]);


    }
}
