import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = "http://127.0.0.1:8000/api/v1"
  private transactions: Transaction[] = [];

  constructor(private http: HttpClient) { }


  // CRUD - Operações de transações financeiras


  // Método para buscar transações com base em um tipo
  searchTransactions(query: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/search?q=${query}`);
  }

  // Retorna todas as transações
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl + "/transactions");
  }

  // Retorna uma transação específica pelo ID
  getTransaction(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(this.apiUrl + "/transaction/" + id);
  }

  // Adiciona uma transação 
  addTransaction(transaction: Transaction): Observable<void> {
    return this.http.post<void>(this.apiUrl + "/transactions/", transaction);
  }

  // Exclui uma transação pelo ID
  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/transaction/" + id);
  }

  // Atualiza uma transação existente
  updateTransaction(id: string, updateTransaction: Transaction): Observable<void> {
    return this.http.put<void>(this.apiUrl + "/transactions/" + id, updateTransaction);
  }
}
