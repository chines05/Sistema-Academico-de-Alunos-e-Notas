<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DisciplinaController;

Route::middleware('api')->group(function () {
    // Rota pública de login
    Route::post('/login', [AuthController::class, 'login']);
    
    // Rotas protegidas por autenticação
    Route::middleware('auth:sanctum')->group(function () {
        // Rota de logout
        Route::post('/logout', [AuthController::class, 'logout']);
        
        // Rota do usuário autenticado
        Route::get('/user', function (Request $request) {
            return response()->json([
                'user' => $request->user(),
                'roles' => [] // Você pode adicionar roles/permissões aqui se necessário
            ]);
        });
        
        // Rotas de disciplinas (apenas as necessárias)
        Route::get('/disciplinas', [DisciplinaController::class, 'index']); // Listar todas
        Route::get('/disciplinas/{id}', [DisciplinaController::class, 'show']); // Mostrar uma específica
    });
});