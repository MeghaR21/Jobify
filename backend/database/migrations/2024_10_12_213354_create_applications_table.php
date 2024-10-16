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
            $table->text('message'); // message recupere lors de la connexion
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');  // Référence à la personne qui postule
            $table->foreignId('advertisement_id')->constrained('advertisements')->onDelete('cascade');  // Référence à l'annonce d'emploi
            $table->foreignId('unregistered_user_id')->nullable()->constrained('unregistered_users')->onDelete('cascade');
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
