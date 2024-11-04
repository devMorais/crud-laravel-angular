import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private apiUrl = "http://127.0.0.1:8000/api/v1"
  private categories: Category[] = [];

  constructor(private http: HttpClient) { }

  // CRUD - Operações de transações financeiras

  // Retorna todas as categorias
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + "/categories");
  }

  // Retorna uma categoria específica pelo ID
  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(this.apiUrl + "/category/" + id);
  }

  // Adiciona uma categoria 
  addCategorie(categorie: Category): Observable<void> {
    return this.http.post<void>(this.apiUrl + "/categories/", categorie);
  }

  // Exclui uma categoria pelo ID
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/category/" + id);
  }

  // Atualiza uma categoria existente
  updateCategorie(id: string, updateCategorie: Category): Observable<void> {
    return this.http.put<void>(this.apiUrl + "/categories/" + id, updateCategorie);
  }
}
