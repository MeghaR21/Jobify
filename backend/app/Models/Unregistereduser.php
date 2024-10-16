<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unregistereduser extends Model
{
    use HasFactory;
    protected $table='unregisteredusers';
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
    ];

    public function applications()
    {
        return $this->hasMany(Application::class, 'unregistereduser_id');
    }
}
