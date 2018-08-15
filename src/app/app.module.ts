import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from '@angular/common/http';

import {NgxEchartsModule} from 'ngx-echarts';

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {MaterialModule} from "./material";
import {NavbarComponent} from './shared/navbar/navbar.component';
import {RecipeComponent} from './recipe/recipe.component';
import {IngredientComponent} from './ingredient/ingredient.component';
import {TableComponent} from './shared/table/table.component';
import {CompareComponent} from './compare/compare.component';
import {HealthLabelPipePipe} from './health-label-pipe.pipe';

@NgModule({
    declarations: [AppComponent, NavbarComponent, RecipeComponent, IngredientComponent, TableComponent, CompareComponent, HealthLabelPipePipe],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule,
        HttpClientModule,
        NgxEchartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
