<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            AlunosSeeder::class,
            DisciplinasSeeder::class,
            MatriculasSeeder::class,
            NotasSeeder::class
        ]);
    }
}