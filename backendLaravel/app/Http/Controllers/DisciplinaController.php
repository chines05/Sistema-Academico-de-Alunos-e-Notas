<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use App\Models\Disciplina;
use App\Models\Matricula;
use App\Models\Nota;
use Illuminate\Http\Request;

class DisciplinaController extends Controller
{
    public function disciplinasPorAluno($alunoId)
    {
        $aluno = Aluno::find($alunoId);

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        $disciplinas = Disciplina::whereHas('matriculas', function ($query) use ($alunoId) {
            $query->where('aluno_id', $alunoId);
        })->get();

        return response()->json([
            'aluno' => $aluno->only(['id', 'nome', 'email']),
            'disciplinas' => $disciplinas
        ]);
    }
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

    public function mediaPorDisciplina($alunoId, $disciplinaId)
    {
        $notas = Nota::where('aluno_id', $alunoId)
            ->where('disciplina_id', $disciplinaId)
            ->first();

        if (!$notas) {
            return response()->json(['message' => 'Notas não encontradas para cálculo da média'], 404);
        }

        $media = ($notas->nota1 + $notas->nota2 + $notas->nota3) / 3;

        $status = $media >= 6 ? 'aprovado' : 'reprovado';

        return response()->json([
            'aluno_id' => $alunoId,
            'disciplina_id' => $disciplinaId,
            'media' => round($media, 2),
            'status' => $status
        ]);
    }
}
