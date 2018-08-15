import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../recipe.service";

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {


    constructor(private recipeService: RecipeService) {
    }

    options: any;

    ngOnInit() {
        this.options = {
            legend: {},
            tooltip: {
                formatter: function (params, ticket, callback) {
                    console.log(params)
                    return 'aa'
                }
            },
            dataset: {
                source: [
                    ['nutrition', 'kCal', '2013', '2014', '2015'],
                    ['Matcha Latte', 41.1, 30.4, 65.1, 0],
                    ['Milk Tea', 86.5, 92.1, 85.7, 83.1],

                ]
            },
            xAxis: [
                {type: 'category', gridIndex: 0},

            ],
            yAxis: [
                {gridIndex: 0},
            ],
            grid: [
                {bottom: '55%'},
                {top: '55%'}
            ],
            series: [
                // These series are in the first grid.
                {type: 'bar', seriesLayoutBy: 'row'},
                {type: 'bar', seriesLayoutBy: 'row'},
            ]
        };
    }

    getIngredientsData(firstIngredient, secondIngredient) {
        this.recipeService.getIngredient(firstIngredient).subscribe(firstIngredientData => {
            console.log(firstIngredientData);
            this.recipeService.getIngredient(secondIngredient).subscribe(secondIngredientData => {
                console.log(secondIngredientData);
            })
        })
    }

}
