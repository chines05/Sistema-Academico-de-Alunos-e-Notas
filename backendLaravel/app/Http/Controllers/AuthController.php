<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'email' => 'required|email|unique:alunos',
            'cpf' => 'required|size:11|unique:alunos',
            'senha' => 'required|min:6'
        ]);

        $aluno = Aluno::create([
            'nome' => $request->nome,
            'email' => $request->email,
            'cpf' => $request->cpf,
            'senha' => Hash::make($request->senha)
        ]);

        return response()->json([
            'message' => 'Usuário criado com sucesso',
            'user' => $aluno
        ], 201);
    }
}