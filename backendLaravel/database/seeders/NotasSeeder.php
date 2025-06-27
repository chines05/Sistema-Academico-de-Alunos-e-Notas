<?php

namespace Database\Seeders;

use App\Models\Nota;
use Illuminate\Database\Seeder;

class NotasSeeder extends Seeder
{
    public function run()
    {
        Nota::create([
            'aluno_id' => 1,
            'disciplina_id' => 1,
            'nota1' => 8.5,
            'nota2' => 7.0,
            'nota3' => 9.0
        ]);

        Nota::create([
            'aluno_id' => 1,
            'disciplina_id' => 2,
            'nota1' => 6.5,
            'nota2' => 8.0,
            'nota3' => 2.0
        ]);

        Nota::create([
            'aluno_id' => 1,
            'disciplina_id' => 3,
            'nota1' => 7.5,
            'nota2' => 1.0,
            'nota3' => 8.5
        ]);

        Nota::create([
            'aluno_id' => 1,
            'disciplina_id' => 4,
            'nota1' => 9.0,
            'nota2' => 7.5,
            'nota3' => 8.0
        ]);

        Nota::create([
            'aluno_id' => 1,
            'disciplina_id' => 5,
            'nota1' => 5.0,
            'nota2' => 6.0,
            'nota3' => 2.0
        ]);

        Nota::create([
            'aluno_id' => 1,
            'disciplina_id' => 6,
            'nota1' => 8.0,
            'nota2' => 7.0,
            'nota3' => 9.0
        ]);

        Nota::create([
            'aluno_id' => 1,
            'disciplina_id' => 7,
            'nota1' => 7.5,
            'nota2' => 8.5,
            'nota3' => 6.5
        ]);

        Nota::create([
            'aluno_id' => 1,
            'disciplina_id' => 8,
            'nota1' => 9.0,
            'nota2' => 8.0,
            'nota3' => 7.0
        ]);
    }
}