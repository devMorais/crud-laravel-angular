import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  { path: "", component: TransactionListComponent },
  { path: "create-transaction", component: TransactionFormComponent },
  { path: "list-category", component: CategoryListComponent },
  { path: "create-category", component: CategoryFormComponent },
  { path: "edit-transaction/:id", component: TransactionFormComponent },
  { path: "edit-category/:id", component: CategoryFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
