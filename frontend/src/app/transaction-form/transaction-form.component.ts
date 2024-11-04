import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../transaction/transaction.service';
import { Transaction } from '../models/transaction';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  transactionForm: FormGroup = new FormGroup({});
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    // Configuração do formulário
    this.transactionForm = this.formBuilder.group({
      type: ['', Validators.required],
      category_id: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });

    // Carregar categorias de forma assíncrona com subscribe
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    // Verificar se existe um ID na rota para carregar a transação
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.transactionService.getTransaction(id).subscribe(transaction => {
        if (transaction) {
          this.transactionForm.patchValue(transaction);
        }
      });
    }
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      let transaction: Transaction = this.transactionForm.value;
      // Verificar se existe um ID na rota para carregar a transação
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        // Atualizar transação existente
        this.transactionService.updateTransaction(id, transaction).subscribe(() => {
          console.log('Solicitação de atualização processada!');
          this.router.navigate(['/']);
        });
      } else {
        // Adicionar nova transação
        this.transactionService.addTransaction(transaction).subscribe(() => {
          console.log('Solicitação de atualização processada!');
          this.router.navigate(['/']);
        });
      }

    }
  }
}
