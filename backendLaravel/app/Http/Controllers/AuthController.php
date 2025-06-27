<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'senha' => 'required|string'
        ]);

        $aluno = Aluno::where('email', $request->email)->first();

        if (!$aluno || !Hash::check($request->senha, $aluno->senha)) {
            return response()->json(['erro' => 'Credenciais inválidas'], 401);
        }

        $token = $aluno->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login realizado com sucesso',
            'user' => [
                'id' => $aluno->id,
                'nome' => $aluno->nome,
                'email' => $aluno->email,
            ],
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Logout realizado com sucesso'
        ]);
    }
}