import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RecipeComponent} from './recipe/recipe.component';
import {IngredientComponent} from './ingredient/ingredient.component';


const routes: Routes = [
  {path: 'ingredient', component: IngredientComponent},
  {path: 'recipe', component: RecipeComponent},
  {path: '', redirectTo: '/recipe', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
