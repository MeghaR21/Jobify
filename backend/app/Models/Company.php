<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $table='companies';
    protected $fillable = [
        'name',
        'email',
        'address',
        'website',
    ];

    public function advertisements()
    {
        return $this->hasMany(Advertisement::class, 'company_id');
    }

     // Une entreprise a plusieurs recruteurs
     public function recruiters()
     {
         return $this->hasMany(User::class, 'company_id')->where('role', 'recruiter');
     }
}
