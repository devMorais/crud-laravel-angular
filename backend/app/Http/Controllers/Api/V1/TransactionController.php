<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\TransactionStoreRequest;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Lista todas as transações.
     * Método: GET /api/v1/transactions
     * @return \Illuminate\Http\JsonResponse
     */
    function index(): JsonResponse
    {
        $transactions = Transaction::with('category')->get();
        return response()->json($transactions, 200);
    }

    public function search(Request $request)
    {
        // Mapeamento de termos em português para os tipos em inglês
        $typeMapping = [
            'despesa' => 'expense',
            'receita' => 'income'
        ];

        // Verifica se o parâmetro 'q' foi passado na requisição
        if ($request->has('q')) {
            // Obtém o valor da consulta em português
            $query = $request->q;

            // Traduz o termo para inglês, se possível
            $translatedType = $typeMapping[$query] ?? $query;

            // Realiza a busca usando o termo traduzido
            $transactions = Transaction::where('type', 'like', '%' . $translatedType . '%')->get();

            return response()->json($transactions, 200);
        }

        return response()->json([], 200);
    }


    /**
     * Armazena uma nova transação no banco de dados.
     * Método: POST /api/v1/transactions
     * @param \Illuminate\Http\TransactionStoreRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TransactionStoreRequest $request): JsonResponse
    {
        // Criação de uma nova transação
        $transaction = new Transaction();

        // Atribuindo os valores recebidos aos atributos do modelo
        $transaction->type = $request->type;
        $transaction->category_id = $request->category_id;
        $transaction->description = $request->description;

        // Lógica para armazenar o valor corretamente baseado no tipo
        if ($request->type == 'expense') {
            $transaction->amount = -abs($request->amount); // Armazenando como negativo para despesas
        } else {
            $transaction->amount = $request->amount; // Para receitas, armazena o valor normalmente
        }

        // Salvando a transação no banco de dados
        $transaction->save();

        return response()->json($transaction, 201); // Retorna a transação criada com o status 201 (Criado)
    }

    /**
     * Exibe uma transação financeira específica pelo ID.
     * Método: GET /api/v1/transaction/{id}
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id): JsonResponse
    {
        $transaction = Transaction::findOrFail($id);
        return response()->json($transaction, 200);
    }


    /**
     * Atualiza uma transação financeira existente.
     * Método: PUT /api/v1/transactions/{id}
     * @param \Illuminate\Http\TransactionStoreRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TransactionStoreRequest $request, $id): JsonResponse
    {
        $transaction = Transaction::findOrFail($id);

        // Atribuindo os valores recebidos aos atributos do modelo
        $transaction->type = $request->type;
        $transaction->category_id = $request->category_id;
        $transaction->description = $request->description;

        // Lógica para ajustar o valor baseado no tipo, mesmo que o campo 'amount' não seja alterado diretamente
        if ($transaction->type == 'expense') {
            $transaction->amount = -abs($transaction->amount); // Força o valor negativo para despesas
        } else {
            $transaction->amount = abs($transaction->amount); // Força o valor positivo para receitas
        }

        // Atualiza os dados da transação
        $transaction->save();

        return response()->json(['message' => 'Transação financeira atualizada com sucesso!'], 200);
    }

    /**
     * Remove uma transação do banco de dados.
     * Método: DELETE /api/v1/transaction/{id}
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        // Busca a transação ou lança uma exceção se não encontrada
        $transaction = Transaction::findOrFail($id);

        // Remove a transação
        $transaction->delete();

        // Retorna uma resposta de sucesso
        return response()->json(['message' => 'Transação financeira removida com sucesso'], 200);
    }
}
