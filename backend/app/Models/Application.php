<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;
    protected $table = 'applications';

    protected $fillable = [
        'advertisement_id',      // ID du poste pour lequel la candidature est faite
        'user_id',   // ID de la personne qui postule
        'message',
        // Ajoutez d'autres champs si nécessaire
    ];

    // La candidature appartient à une annonce
    public function advertisement()
    {
        return $this->belongsTo(Advertisement::class, 'advertisement_id');
    }

    // La candidature est soumise par un candidat (utilisateur)
    public function candidate()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
