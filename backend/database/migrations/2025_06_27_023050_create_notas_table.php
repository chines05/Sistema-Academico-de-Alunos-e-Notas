<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('notas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('aluno_id')->constrained('alunos');
            $table->foreignId('disciplina_id')->constrained('disciplinas');
            $table->decimal('nota1', 4, 2)->nullable();
            $table->decimal('nota2', 4, 2)->nullable();
            $table->decimal('nota3', 4, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('notas');
    }
};