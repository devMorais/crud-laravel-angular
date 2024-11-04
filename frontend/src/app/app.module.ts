import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionListModule } from './transaction-list/transaction-list.module';
import { TransactionFormModule } from './transaction-form/transaction-form.module';
import { CategoryListModule } from './category-list/category-list.module';
import { CategoryFormModule } from './category-form/category-form.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TransactionListModule,
    TransactionFormModule,
    CategoryListModule,
    CategoryFormModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
