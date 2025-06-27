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
            'semestre' => '2023.1'
        ]);

        Matricula::create([
            'aluno_id' => 1,
            'disciplina_id' => 2,
            'semestre' => '2023.1'
        ]);

        Matricula::create([
            'aluno_id' => 2,
            'disciplina_id' => 1,
            'semestre' => '2023.1'
        ]);
    }
}