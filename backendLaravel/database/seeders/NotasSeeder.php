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
            'nota3' => null
        ]);

        Nota::create([
            'aluno_id' => 2,
            'disciplina_id' => 1,
            'nota1' => 7.5,
            'nota2' => 6.0,
            'nota3' => 8.5
        ]);
    }
}