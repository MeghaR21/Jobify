<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;
    protected $table='advertisements';

    protected $fillable = [
        'job_title',       // Assurez-vous d'adapter ces champs à ceux que vous avez dans votre table
        'location',
        'salary',
        'contract_type',
        'description',
        'full_description',
        'company_id',  // Si vous avez un champ pour la relation avec la table companies
        'user_id',
    ];

    //L'annonce appartient à une entreprise
    public function company()
    {
        return $this->belongsTo(Company::class,'company_id');
    }

    // Une annonce a plusieurs candidatures
    public function applications()
    {
        return $this->hasMany(Application::class, 'advertisement_id');
    }

    // L'annonce est publiée par un recruteur (utilisateur)
    public function recruiter()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
