import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";

import { Ingredient } from "../ingredient";
import { RecipeService } from "../recipe.service";

export interface Nutrition {
  label: string;
  quantity: number;
  unit: string;
}



@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"]
})
export class RecipeComponent implements OnInit {
  ingredients: Ingredient[] = [];
  hasFocus = false;
  loading = false;
  healthLabels = [];
  dataSource  : Nutrition[] = [
  ];
  ELEMENT_DATA = [];

  constructor(
    public snackBar: MatSnackBar,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {}

  postRecipe(recipeTitle: string): void {
    recipeTitle = recipeTitle.trim();
    if (recipeTitle === "") {
      this.openSnackBar("Recipe title is required!", "Done");
      return;
    }
    if (this.ingredients.length === 0) {
      this.openSnackBar("Insert at least an ingredient!", "Done");
      return;
    }

    let recipe = {
      title: recipeTitle,
      ingr: this.formatIngredients(this.ingredients)
    };
    this.healthLabels = [];
    this.dataSource = [];
    this.loading = true;
    this.recipeService.postRecipe(recipe).subscribe(recipe => {
      this.healthLabels = recipe.healthLabels;
      this.formatDataSource(recipe.totalNutrients);
      this.dataSource = this.ELEMENT_DATA;
      this.loading = false;
    });
  }


  resetFields(){
    this.dataSource = [];
    this.healthLabels = [];
    this.ingredients = [];
  }

  formatDataSource(totalNutrients){
      for(let nutrient in totalNutrients){
        this.ELEMENT_DATA.push(totalNutrients[nutrient]);
      }
  }

  addIngredient(ingredient: string): void {
    ingredient = ingredient.trim();
    if (ingredient === "") {
      return;
    }
    this.ingredients.push({
      name: ingredient
    });
  }

  deleteIngredient(ingredient: Ingredient) {
    this.ingredients = this.ingredients.filter(h => h !== ingredient);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  formatIngredients(ingredients: Ingredient[]) {
    let array = [];
    for (let ingredient of ingredients) {
      array.push(ingredient.name);
    }
    return array;
  }
}
