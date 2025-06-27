<?php

namespace App\Http\Controllers;

use App\Mail\NewPasswordMail;
use App\Models\Aluno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;


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

    public function generateNewPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $aluno = Aluno::where('email', $request->email)->first();

        if (!$aluno) {
            return response()->json([
                'success' => false,
                'message' => 'E-mail não encontrado'
            ], 404);
        }

        try {
            $newPassword = Str::random(8);
            $aluno->senha = Hash::make($newPassword);
            $aluno->save();

            Mail::to($aluno->email)->send(new NewPasswordMail($newPassword, $aluno));

            return response()->json([
                'success' => true,
                'message' => 'Nova senha enviada por e-mail'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao enviar e-mail: ' . $e->getMessage()
            ], 500);
        }
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $aluno = $request->user();

        if (!Hash::check($request->current_password, $aluno->senha)) {
            return response()->json(['message' => 'Senha atual incorreta'], 401);
        }

        $aluno->senha = Hash::make($request->new_password);
        $aluno->save();

        return response()->json(['message' => 'Senha alterada com sucesso']);
    }

    public function changeName(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $aluno = $request->user();

        $aluno->nome = $request->name;
        $aluno->save();

        return response()->json(['message' => 'Nome alterado com sucesso']);
    }
}
