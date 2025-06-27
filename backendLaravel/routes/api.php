<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DisciplinaController;

Route::middleware('api')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/generate-new-password', [AuthController::class, 'generateNewPassword']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::put('/change-password', [AuthController::class, 'changePassword']);
        Route::put('/change-name', [AuthController::class, 'changeName']);
        Route::get('/user', function (Request $request) {
            return $request->user()->only(['id', 'nome', 'email']);
        });

        Route::prefix('alunos/{aluno}')->group(function () {
            Route::get('/disciplinas', [DisciplinaController::class, 'disciplinasPorAluno']);

            Route::prefix('disciplinas/{disciplina}')->group(function () {
                Route::get('/notas', [DisciplinaController::class, 'notasPorDisciplina']);
                Route::get('/media', [DisciplinaController::class, 'mediaPorDisciplina']);
            });
        });
    });
});
