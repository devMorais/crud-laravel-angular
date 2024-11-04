<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\CategoryStoreRequest;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Lista todas as categorias.
     * Método: GET /api/v1/categories
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $categories = Category::all();
        return response()->json($categories, 200);
    }

    /**
     * Armazena uma nova categoria no banco de dados.
     * Método: POST /api/v1/categories
     * @param \Illuminate\Http\CategoryStoreRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CategoryStoreRequest $request): JsonResponse
    {
        // Cria uma nova instância de categoria
        $category = new Category();
        $category->category = $request->category;

        $category->save();

        return response()->json($category, 201); // Retorna a categoria criada com o status 201 (Criado)
    }

    /**
     * Exibe uma categoria específica pelo ID.
     * Método: GET /api/v1/category/{id}
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id): JsonResponse
    {
        $category = Category::findOrFail($id);
        return response()->json($category, 200);
    }

    /**
     * Atualiza uma categoria existente.
     * Método: PUT /api/v1/categories/{id}
     * @param \Illuminate\Http\CategoryStoreRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(CategoryStoreRequest $request, $id): JsonResponse
    {
        $category = Category::findOrFail($id);
        $category->category = $request->category;

        // Atualiza os dados da categoria
        $category->save();

        return response()->json(['message' => 'Categoria atualizada com sucesso!'], 200); // Retorna a categoria atualizada com o status 200 (OK)
    }

    /**
     * Remove uma categoria do banco de dados.
     * Método: DELETE /api/v1/category/{id}
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        // Busca a categoria ou lança uma exceção se não encontrada
        $category = Category::findOrFail($id);

        // Verifica se há transações associadas a essa categoria
        $hasItem = Transaction::where('category_id', $category->id)->count();

        if ($hasItem == 0) {
            // Remove a categoria e retorna a mensagem de sucesso
            $category->delete();
            return response()->json(['message' => 'Categoria removida com sucesso'], 200);
        }

        // Retorna uma resposta de erro se houver transações associadas
        return response()->json(['status' => 'error', 'message' => 'Não é possível remover a categoria, pois existem transações financeiras associadas.'], 400);
    }
}
