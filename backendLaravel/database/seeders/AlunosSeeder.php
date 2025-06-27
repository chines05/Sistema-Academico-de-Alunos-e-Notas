<?php

namespace Database\Seeders;

use App\Models\Aluno;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AlunosSeeder extends Seeder
{
    public function run()
    {
        Aluno::create([
            'nome' => 'Chines Porto',
            'cpf' => '12345678901',
            'email' => 'chines@aluno.ifnmg.edu.br',
            'senha' => Hash::make('Chines05')
        ]);
    }
}