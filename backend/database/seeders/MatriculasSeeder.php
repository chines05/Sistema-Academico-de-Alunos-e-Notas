<?php

namespace Database\Seeders;

use App\Models\Matricula;
use Illuminate\Database\Seeder;

class MatriculasSeeder extends Seeder
{
    public function run()
    {
        Matricula::create([
            'aluno_id' => 1,
            'disciplina_id' => 1,
            'semestre' => '1'
        ]);

        Matricula::create([
            'aluno_id' => 1,
            'disciplina_id' => 2,
            'semestre' => '1'
        ]);

        Matricula::create([
            'aluno_id' => 1,
            'disciplina_id' => 3,
            'semestre' => '2'
        ]);

        Matricula::create([
            'aluno_id' => 1,
            'disciplina_id' => 4,
            'semestre' => '2'
        ]);

        Matricula::create([
            'aluno_id' => 1,
            'disciplina_id' => 5,
            'semestre' => '3'
        ]);

        Matricula::create([
            'aluno_id' => 1,
            'disciplina_id' => 6,
            'semestre' => '3'
        ]);

        Matricula::create([
            'aluno_id' => 1,
            'disciplina_id' => 7,
            'semestre' => '4'
        ]);

        Matricula::create([
            'aluno_id' => 1,
            'disciplina_id' => 8,
            'semestre' => '4'
        ]);
    }
}