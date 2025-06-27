<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Aluno extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'nome',
        'cpf',
        'email', 
        'senha'
    ];

    protected $hidden = [
        'senha',
        'remember_token',
    ];

    public function matriculas()
    {
        return $this->hasMany(Matricula::class);
    }

    public function notas()
    {
        return $this->hasMany(Nota::class);
    }
}