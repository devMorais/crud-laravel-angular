import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'] // Corrigido de styleUrl para styleUrls
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  errorMessage: string | null = null; // Adicionando a propriedade errorMessage

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        console.log("Categoria removida com sucesso");
        // Atualize a lista local para refletir a exclusão
        this.categories = this.categories.filter(category => category.id !== id);
        this.errorMessage = null;
      },
      (error) => {
        if (error.status === 400 && error.error && error.error.message) {
          // Define a mensagem de erro vinda do backend para exibir ao usuário
          this.errorMessage = error.error.message;
        } else {
          // Exibe uma mensagem genérica em caso de outros erros
          console.error("Erro ao excluir a categoria:", error);
          this.errorMessage = "Erro ao excluir a categoria. Tente novamente mais tarde.";
        }
      }
    );
  }

}
