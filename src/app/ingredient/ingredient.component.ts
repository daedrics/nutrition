import {Component, OnInit} from "@angular/core";
import {MatSnackBar} from "@angular/material";

import {RecipeService} from "../recipe.service";

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

    constructor(public snackBar: MatSnackBar,
                private recipeService: RecipeService) {
    }

    ngOnInit() {
    }

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
        if (ingredient === '') {
            this.openSnackBar('Ingredient is required!', 'Done');
            return;
        }
        this.healthLabels = [];
        this.dataSource = [];
        this.loading = true;
        this.recipeService.getIngredient(ingredient).subscribe(nutritionData => {
            this.healthLabels = nutritionData.healthLabels;
            this.dataSource = this.formatDataSource(nutritionData.totalNutrients);
            this.loading = false;
        })
    }

    formatDataSource(totalNutrients) {
        let data = [];
        for (let nutrient in totalNutrients) {
            data.push(totalNutrients[nutrient]);
        }
        return data;
    }
}
