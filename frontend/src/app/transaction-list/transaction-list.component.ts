import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction/transaction.service';
import { Transaction } from '../models/transaction';
import { CategoryService } from '../category/category.service';
import { Category } from '../models/category';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];
  searchQuery: string = '';

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }
  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.category : 'Categoria não encontrada';
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });
  }
  // Método para realizar a busca
  searchTransactions(): void {
    const query = this.searchQuery.trim().toLowerCase();
    if (query === 'despesa' || query === 'receita') {
      this.transactionService.searchTransactions(query).subscribe((data) => {
        this.transactions = data;
      });
    } else {
      alert("Por favor, digite apenas 'Despesa' ou 'Receita'.");
      this.loadTransactions();
    }
  }

  deleteTransaction(id: string): void {
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        console.log("A solicitação de exclusão foi processada!");
        this.loadTransactions();
      },
      error: (err) => console.error("Erro ao excluir transação:", err)
    });
  }
}
