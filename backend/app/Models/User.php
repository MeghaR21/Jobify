<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role',    //rajoute pour savoir si l'utilisateur est un candidat ou un recruiteur
        
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


      //------------------Definition des relations----------------------//
    
    
    // Un utilisateur peut soumettre plusieurs candidatures
    public function applications()
    {
        return $this->hasMany(Application::class, 'user_id');
    }

    // Si l'utilisateur est un recruteur, il peut publier plusieurs annonces
    public function advertisements()
    {
        return $this->hasMany(Advertisement::class, 'user_id')->where('role', 'recruiter');
    }

    // Si l'utilisateur est un recruteur, il appartient à une entreprise
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}
