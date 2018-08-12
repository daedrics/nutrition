import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";

import { RecipeService } from "../recipe.service";

export interface Nutrition {
  label: string;
  quantity: number;
  unit: string;
}

@Component({
  selector: "app-ingredient",
  templateUrl: "./ingredient.component.html",
  styleUrls: ["./ingredient.component.scss"]
})
export class IngredientComponent implements OnInit {
  loading = false;
  healthLabels = [];
  dataSource: Nutrition[] = [];
  ELEMENT_DATA = [];

  constructor(
    public snackBar: MatSnackBar,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {}

  resetFields() {
    this.dataSource = [];
    this.healthLabels = [];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  postIngredient(ingredient) {
    ingredient = ingredient.trim();
    if(ingredient === ''){
        this.openSnackBar('Ingredient is required!','Done');
        return;
    }
    this.healthLabels = [];
    this.dataSource = [];
    this.loading = true;
    this.recipeService.getIngredient(ingredient).subscribe(nutritionData => {
      this.healthLabels = nutritionData.healthLabels;
      this.formatDataSource(nutritionData.totalNutrients);
      this.dataSource = this.ELEMENT_DATA;
      this.loading = false;
    })
  }

  formatDataSource(totalNutrients){
    for(let nutrient in totalNutrients){
      this.ELEMENT_DATA.push(totalNutrients[nutrient]);
    }
}
}
