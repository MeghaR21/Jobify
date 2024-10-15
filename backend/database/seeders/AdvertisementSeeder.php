<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Advertisement;
use App\Models\User;

class AdvertisementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Récupérer les utilisateurs avec le rôle de recruteur
        $recruiters = User::where('role', 'recruiter')->get();

         // S'assurer qu'il y a au moins un recruteur
        if ($recruiters->isEmpty()) {
            $this->command->error('Aucun utilisateur avec le rôle de recruteur trouvé. Veuillez en créer un avant de lancer le seeder.');
            return; // Arrêter l'exécution si aucun recruteur n'est trouvé
        }
        
         // Créer les annonces
         Advertisement::create([
            'job_title' => 'Software Engineer',
            'location' => 'San Francisco, CA',
            'salary' => 120000.00,
            'contract_type' => 'Full-time',
            'description' => 'Develop and maintain web applications.',
            'full_description' => 'As a Software Engineer, you will work on developing and maintaining web applications using modern technologies. You will collaborate with cross-functional teams to define and design new features. Candidates should have a strong background in programming and experience with agile methodologies.',
            'company_id' => 1, // Assurez-vous que l'ID de la société existe
            'user_id' => $recruiters->random()->id, // Utiliser un recruteur aléatoire
        ]);

        Advertisement::create([
            'job_title' => 'Product Manager',
            'location' => 'New York, NY',
            'salary' => 130000.00,
            'contract_type' => 'Full-time',
            'description' => 'Lead product development and strategy.',
            'full_description' => 'We are looking for a Product Manager to lead the product development and strategy. You will work closely with engineering and marketing teams to ensure the successful launch and ongoing improvement of products. Ideal candidates should have experience in project management and product lifecycle management.',
            'company_id' => 2,
            'user_id' => $recruiters->random()->id,
        ]);

        Advertisement::create([
            'job_title' => 'Data Analyst',
            'location' => 'Austin, TX',
            'salary' => 90000.00,
            'contract_type' => 'Part-time',
            'description' => 'Analyze data and provide insights to improve business decisions.',
            'full_description' => 'As a Data Analyst, you will gather, analyze, and interpret data to provide insights that help the business make informed decisions. You should have experience with data analysis tools and excellent problem-solving skills.',
            'company_id' => 3,
            'user_id' => $recruiters->random()->id,
        ]);

        Advertisement::create([
            'job_title' => 'UX Designer',
            'location' => 'Los Angeles, CA',
            'salary' => 95000.00,
            'contract_type' => 'Apprenticeship',
            'description' => 'Design user-friendly interfaces and improve user experience.',
            'full_description' => 'The UX Designer will be responsible for designing user-friendly interfaces and improving the user experience for web applications. Strong skills in wireframing, prototyping, and user testing are required.',
            'company_id' => 4,
            'user_id' => $recruiters->random()->id,
    ]);

        Advertisement::create([
            'job_title' => 'Marketing Specialist',
            'location' => 'Chicago, IL',
            'salary' => 70000.00,
            'contract_type' => 'Full-time',
            'description' => 'Develop and execute marketing strategies.',
            'full_description' => 'We are looking for a Marketing Specialist to develop and execute marketing strategies that drive customer engagement and brand awareness. Strong knowledge of digital marketing tools and analytics is preferred.',
            'company_id' => 5,
            'user_id' => $recruiters->random()->id,
        ]);

        // 15 nouvelles annonces avec full_description
        Advertisement::create([
            'job_title' => 'Network Engineer',
            'location' => 'Seattle, WA',
            'salary' => 95000.00,
            'contract_type' => 'Full-time',
            'description' => 'Maintain and configure network infrastructure.',
            'full_description' => 'The Network Engineer will maintain and configure network infrastructure, troubleshoot issues, and ensure network security. Candidates should have experience with routing, switching, and firewalls.',
            'company_id' => 1,
            'user_id' => $recruiters->random()->id,
        ]);

        Advertisement::create([
            'job_title' => 'System Administrator',
            'location' => 'Denver, CO',
            'salary' => 85000.00,
            'contract_type' => 'Full-time',
            'description' => 'Administer and manage server environments.',
            'full_description' => 'As a System Administrator, you will administer and manage server environments, perform backups, and ensure uptime. Strong knowledge of Linux and Windows server environments is required.',
            'company_id' => 2,
            'user_id' => $recruiters->random()->id,
        ]);

        Advertisement::create([
            'job_title' => 'Graphic Designer',
            'location' => 'Miami, FL',
            'salary' => 60000.00,
            'contract_type' => 'Part-time',
            'description' => 'Create visual content for marketing materials.',
            'full_description' => 'The Graphic Designer will create visual content for marketing materials and online platforms. A strong portfolio and experience with design software are essential.',
            'company_id' => 3,
            'user_id' => $recruiters->random()->id,
        ]);

        Advertisement::create([
            'job_title' => 'Sales Executive',
            'location' => 'Boston, MA',
            'salary' => 70000.00,
            'contract_type' => 'Full-time',
            'description' => 'Drive sales growth by developing new customer relationships.',
            'full_description' => 'As a Sales Executive, you will drive sales growth by developing new customer relationships and maintaining existing accounts. Strong communication skills and sales experience are required.',
            'company_id' => 4,
            'user_id' => $recruiters->random()->id,
        ]);

        Advertisement::create([
            'job_title' => 'Quality Assurance Engineer',
            'location' => 'Portland, OR',
            'salary' => 80000.00,
            'contract_type' => 'Full-time',
            'description' => 'Ensure software quality through testing.',
            'full_description' => 'The Quality Assurance Engineer will ensure software quality through testing and validation processes. Experience with automated testing tools is a plus.',
            'company_id' => 5,
            'user_id' => $recruiters->random()->id,
        ]);

        Advertisement::create([
            'job_title' => 'Content Writer',
            'location' => 'San Diego, CA',
            'salary' => 65000.00,
            'contract_type' => 'Internship',
            'description' => 'Create engaging content for blogs and websites.',
            'full_description' => 'As a Content Writer, you will create engaging content for blogs, websites, and social media. Strong writing skills and creativity are essential.',
            'company_id' => 1,
            'user_id' => $recruiters->random()->id,
        ]);

        Advertisement::create([
            'job_title' => 'Database Administrator',
            'location' => 'Phoenix, AZ',
            'salary' => 90000.00,
            'contract_type' => 'Full-time',
            'description' => 'Manage and optimize database systems.',
            'full_description' => 'The Database Administrator will manage and optimize database systems, ensuring data integrity and performance. Experience with SQL and database management is required.',
            'company_id' => 2,
            'user_id' => $recruiters->random()->id,
        ]);

        Advertisement::create([
            'job_title' => 'SEO Specialist',
            'location' => 'Atlanta, GA',
            'salary' => 75000.00,
            'contract_type' => 'Part-time',
            'description' => 'Optimize website content for search engines.',
            'full_description' => 'As an SEO Specialist, you will optimize website content and structure to improve search engine rankings. Knowledge of SEO tools and analytics is preferred.',
            'company_id' => 3,
            'user_id' => $recruiters->random()->id,
        ]);

        Advertisement::create([
            'job_title' => 'Business Analyst',
            'location' => 'Dallas, TX',
            'salary' => 95000.00,
            'contract_type' => 'Full-time',
            'description' => 'Analyze business processes and recommend improvements.',
            'full_description' => 'The Business Analyst will analyze business processes and recommend improvements to increase efficiency. Strong analytical skills and experience with business analysis are required.',
            'company_id' => 4,
            'user_id' => $recruiters->random()->id,
        ]);
        

        Advertisement::create([
            'job_title' => 'Software Developer',
            'location' => 'Paris',
            'salary' => 55000.00,
            'contract_type' => 'Full-time',
            'description' => 'Join our team to develop innovative software solutions.',
            'full_description' => 'As a Software Developer, you will be responsible for writing clean, scalable code. You will work with other developers and team members to design and implement new features.',
            'company_id' => 9,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'Project Manager',
            'location' => 'Lyon',
            'salary' => 65000.00,
            'contract_type' => 'Full-time',
            'description' => 'Oversee project execution and ensure client satisfaction.',
            'full_description' => 'The Project Manager will coordinate all aspects of project delivery, manage timelines, and ensure that project goals are met within budget.',
            'company_id' => 10,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'Data Scientist',
            'location' => 'Marseille',
            'salary' => 60000.00,
            'contract_type' => 'Full-time',
            'description' => 'Analyze data to provide actionable insights.',
            'full_description' => 'You will collect, process, and analyze large datasets, develop algorithms, and create predictive models to support business decisions.',
            'company_id' => 3,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'Marketing Manager',
            'location' => 'Bordeaux',
            'salary' => 70000.00,
            'contract_type' => 'Full-time',
            'description' => 'Develop and execute marketing strategies.',
            'full_description' => 'As a Marketing Manager, you will lead a team to implement campaigns, analyze market trends, and maximize brand awareness.',
            'company_id' => 4,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'Graphic Designer',
            'location' => 'Nice',
            'salary' => 45000.00,
            'contract_type' => 'Part-time',
            'description' => 'Create visual content for various media.',
            'full_description' => 'You will design graphics for websites, social media, and marketing materials, ensuring brand consistency across platforms.',
            'company_id' => 5,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'Business Analyst',
            'location' => 'Toulouse',
            'salary' => 58000.00,
            'contract_type' => 'Full-time',
            'description' => 'Evaluate business processes and identify areas for improvement.',
            'full_description' => 'As a Business Analyst, you will work closely with stakeholders to gather requirements and recommend solutions to improve efficiency.',
            'company_id' => 1,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'DevOps Engineer',
            'location' => 'Strasbourg',
            'salary' => 72000.00,
            'contract_type' => 'Full-time',
            'description' => 'Implement and manage CI/CD pipelines.',
            'full_description' => 'You will collaborate with development and operations teams to automate processes and ensure smooth deployments.',
            'company_id' => 2,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'HR Specialist',
            'location' => 'Lille',
            'salary' => 50000.00,
            'contract_type' => 'Full-time',
            'description' => 'Manage recruitment and employee relations.',
            'full_description' => 'As an HR Specialist, you will handle hiring processes, employee onboarding, and support staff with HR-related inquiries.',
            'company_id' => 3,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'Content Writer',
            'location' => 'Nantes',
            'salary' => 40000.00,
            'contract_type' => 'Freelance',
            'description' => 'Write engaging articles and blog posts.',
            'full_description' => 'You will research topics and produce high-quality content that resonates with our target audience and enhances our online presence.',
            'company_id' => 4,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'Sales Representative',
            'location' => 'Montpellier',
            'salary' => 55000.00,
            'contract_type' => 'Full-time',
            'description' => 'Drive sales and build client relationships.',
            'full_description' => 'As a Sales Representative, you will identify new business opportunities, manage client accounts, and achieve sales targets.',
            'company_id' => 5,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'Quality Assurance Tester',
            'location' => 'Reims',
            'salary' => 48000.00,
            'contract_type' => 'Full-time',
            'description' => 'Ensure software quality through testing.',
            'full_description' => 'You will develop test plans, execute test cases, and report issues to ensure that software products meet quality standards.',
            'company_id' => 1,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'Network Administrator',
            'location' => 'Saint-Étienne',
            'salary' => 52000.00,
            'contract_type' => 'Full-time',
            'description' => 'Maintain network infrastructure and security.',
            'full_description' => 'As a Network Administrator, you will configure and manage network devices, troubleshoot connectivity issues, and ensure data protection.',
            'company_id' => 2,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'Software Tester',
            'location' => 'Le Havre',
            'salary' => 47000.00,
            'contract_type' => 'Full-time',
            'description' => 'Test software applications for functionality and performance.',
            'full_description' => 'You will write test scripts, conduct tests, and report defects to ensure high-quality software delivery.',
            'company_id' => 3,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'Account Manager',
            'location' => 'Grenoble',
            'salary' => 60000.00,
            'contract_type' => 'Full-time',
            'description' => 'Manage client accounts and maintain relationships.',
            'full_description' => 'As an Account Manager, you will be the main point of contact for clients, ensuring their needs are met and identifying upsell opportunities.',
            'company_id' => 4,
            'user_id' => $recruiters->random()->id,
        ]);
        
        Advertisement::create([
            'job_title' => 'IT Support Specialist',
            'location' => 'Dijon',
            'salary' => 45000.00,
            'contract_type' => 'Full-time',
            'description' => 'Provide technical support to users.',
            'full_description' => 'You will assist users with technical issues, troubleshoot hardware and software problems, and maintain IT documentation.',
            'company_id' => 5,
            'user_id' => $recruiters->random()->id,
        ]);

    }
}
