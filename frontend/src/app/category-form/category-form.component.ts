import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category/category.service';
import { Category } from '../models/category';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {

  categoryForm: FormGroup = new FormGroup({})

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required]
    });

    // Verificar se existe um ID na rota para carregar a categoria
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.getCategory(id).subscribe(category => {
        if (category) {
          this.categoryForm.patchValue(category);
        }
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      let category: Category = this.categoryForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        // Atualiza a categoria e redireciona após a confirmação
        this.categoryService.updateCategorie(id, category).subscribe(() => {
          console.log('Solicitação de atualização processada!');
          this.router.navigate(['/list-category']);
        });
      } else {
        // Cadastra a categoria e redireciona após a confirmação
        this.categoryService.addCategorie(category).subscribe(() => {
          console.log('Solicitação de criação processada!');
          this.router.navigate(['/list-category']);
        });
      }
    }
  }

}
