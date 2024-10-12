<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->boolean('email_sent')->default(false);  // Indique si un email a été envoyé
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');  // Référence à la personne qui postule
            $table->foreignId('advertisement_id')->constrained('advertisements')->onDelete('cascade');  // Référence à l'annonce d'emploi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
