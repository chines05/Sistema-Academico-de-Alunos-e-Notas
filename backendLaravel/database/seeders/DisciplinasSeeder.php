<?php

namespace Database\Seeders;

use App\Models\Disciplina;
use Illuminate\Database\Seeder;

class DisciplinasSeeder extends Seeder
{
    public function run()
    {
        Disciplina::create([
            'nome' => 'Programação Web',
            'semestre' => '1'
        ]);

        Disciplina::create([
            'nome' => 'Banco de Dados',
            'semestre' => '1'
        ]);

        Disciplina::create([
            'nome' => 'Desenvolvimento Web',
            'semestre' => '2'
        ]);

        Disciplina::create([
            'nome' => 'Desenvolvimento Web Avançado',
            'semestre' => '2'
        ]);

        Disciplina::create([
            'nome' => 'Redes de Computadores',
            'semestre' => '3'
        ]);

        Disciplina::create([
            'nome' => 'Sistemas Operacionais',
            'semestre' => '3'
        ]);

        Disciplina::create([
            'nome' => 'Engenharia de Software',
            'semestre' => '4'
        ]);

        Disciplina::create([
            'nome' => 'Banco de Dados Avançado',
            'semestre' => '4'
        ]);
    }
}