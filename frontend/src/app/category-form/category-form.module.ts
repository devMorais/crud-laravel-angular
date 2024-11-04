import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CategoryFormModule { }
