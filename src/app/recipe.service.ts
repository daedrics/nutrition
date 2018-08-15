import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, of} from "rxjs";


const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json"
    })
};

@Injectable({
    providedIn: "root"
})
export class RecipeService {
    private nutritionUrlDetails =
        "https://api.edamam.com/api/nutrition-details?app_id=7518359b&app_key=72f19729588e8e890f8c7d03506230dc";

    private nutritionUrl = 'https://api.edamam.com/api/nutrition-data?app_id=7518359b&app_key=72f19729588e8e890f8c7d03506230dc';

    constructor(private http: HttpClient) {
    }

    postRecipe(recipe: any): Observable<any> {
        return this.http.post(this.nutritionUrlDetails, recipe, httpOptions);
    }

    getIngredient(ingredient: any): Observable<any> {
        ingredient = encodeURI(ingredient);
        let url = this.nutritionUrl + "&ingr=" + ingredient;
        return this.http.get(url);
    }
}
