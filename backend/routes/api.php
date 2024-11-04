<?php

use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix' => 'v1'], function () {

    // Transações - Rotas API
    Route::get('/transactions/search', [TransactionController::class, 'search']); // Faz uma consulta/pesquisa pelo tipo

    Route::get('/transactions', [TransactionController::class, 'index']); // Lista transações
    Route::post('/transactions', [TransactionController::class, 'store']); // Cria transação
    Route::put('/transactions/{id}', [TransactionController::class, 'update']); // Atualiza uma transação
    Route::get('/transaction/{id}', [TransactionController::class, 'show']); // Exibe uma transação específica
    Route::delete('/transaction/{id}', [TransactionController::class, 'destroy']); // Remove uma transação

    // Categorias - Rotas API
    Route::get('/categories', [CategoryController::class, 'index']); // Lista categorias
    Route::post('/categories', [CategoryController::class, 'store']); // Cria categoria
    Route::put('/categories/{id}', [CategoryController::class, 'update']); // Atualiza uma categoria
    Route::get('/category/{id}', [CategoryController::class, 'show']); // Exibe uma categoria específica
    Route::delete('/category/{id}', [CategoryController::class, 'destroy']); // Remove uma categoria

});
