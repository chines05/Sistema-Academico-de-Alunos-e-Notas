<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use App\Models\Disciplina;
use App\Models\Matricula;
use App\Models\Nota;
use Illuminate\Http\Request;

class DisciplinaController extends Controller
{
    /**
     * Retorna todas as disciplinas de um aluno específico
     */
    public function disciplinasPorAluno($alunoId)
    {
        // Verifica se o aluno existe
        $aluno = Aluno::find($alunoId);

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        // Busca as disciplinas do aluno através das matrículas
        $disciplinas = Disciplina::whereHas('matriculas', function ($query) use ($alunoId) {
            $query->where('aluno_id', $alunoId);
        })->get();

        return response()->json([
            'aluno' => $aluno->only(['id', 'nome', 'email']),
            'disciplinas' => $disciplinas
        ]);
    }

    /**
     * Retorna as notas do aluno em uma disciplina específica
     */
    public function notasPorDisciplina($alunoId, $disciplinaId)
    {
        $notas = Nota::where('aluno_id', $alunoId)
            ->where('disciplina_id', $disciplinaId)
            ->first();

        if (!$notas) {
            return response()->json(['message' => 'Notas não encontradas para esta disciplina'], 404);
        }

        return response()->json([
            'aluno_id' => $alunoId,
            'disciplina_id' => $disciplinaId,
            'notas' => $notas->only(['nota1', 'nota2', 'nota3'])
        ]);
    }

    /**
     * Retorna a média do aluno em uma disciplina específica e o status (aprovado/reprovado)
     */
    public function mediaPorDisciplina($alunoId, $disciplinaId)
    {
        $notas = Nota::where('aluno_id', $alunoId)
            ->where('disciplina_id', $disciplinaId)
            ->first();

        if (!$notas) {
            return response()->json(['message' => 'Notas não encontradas para cálculo da média'], 404);
        }

        // Calcula a média (supondo que são 3 notas com mesmo peso)
        $media = ($notas->nota1 + $notas->nota2 + $notas->nota3) / 3;

        // Define o status
        $status = $media >= 6 ? 'aprovado' : 'reprovado';

        return response()->json([
            'aluno_id' => $alunoId,
            'disciplina_id' => $disciplinaId,
            'media' => round($media, 2),
            'status' => $status
        ]);
    }
}
