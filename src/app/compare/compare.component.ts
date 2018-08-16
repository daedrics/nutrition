import { Component, OnInit } from '@angular/core';
import { RecipeService } from "../recipe.service";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {


    constructor(private recipeService: RecipeService,public snackBar: MatSnackBar) {
    }

    options: any;
    source: any = [];
    units: any = [];
    loading = false;
    firstIngredientData: any;
    firstIngredientDataSource: any = [];
    secondIgredientData: any;
    secondIgredientDataSource: any = [];


    ngOnInit() {
        
    }

    getIngredientsData(firstIngredient, secondIngredient) {
        

        if(firstIngredient === ''){
            this.openSnackBar('First ingredient is required!','Done');
            return;
        }

        if(secondIngredient === ''){
            this.openSnackBar('Second ingredient is required!','Done');
            return;
        }
        this.reset();
        this.loading = true;
        this.recipeService.getIngredient(firstIngredient).subscribe(firstIngredientData => {
            this.formatSource(firstIngredientData.totalNutrients);
            this.firstIngredientData = firstIngredientData.totalNutrients;
            this.recipeService.getIngredient(secondIngredient).subscribe(secondIngredientData => {
                this.secondIgredientData = secondIngredientData.totalNutrients;
                this.formatSource(secondIngredientData.totalNutrients);
                this.formatFirstIngredientData(firstIngredient);
                this.formatSecondIngredientData(secondIngredient);
                let that = this;
                this.loading = false;
                this.options = {
                    legend: {},
                    tooltip: {
                        formatter: function (params, ticket, callback) {
                            let label = params.name;
                            let value = params.data[params.seriesIndex + 1];
                            let name = params.seriesName;
                            let seriesUnit = '';
                            for(let unit in that.units){
                                if(label === unit){
                                    seriesUnit = that.units[unit];
                                    break;
                                }
                            }
                            return name + ': '+ label + ' '+ value + ' ' + seriesUnit;
                        }
                    },
                    dataZoom: [
                        {
                            show: true,
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'inside',
                            start: 0,
                            end: 100
                        },
                        {
                            show: true,
                            yAxisIndex: 0,
                            filterMode: 'empty',
                            width: 30,
                            height: '80%',
                            showDataShadow: false,
                            left: '93%'
                        }
                    ],
                    dataset: {
                        source: [
                            this.source,
                            this.firstIngredientDataSource,
                            this.secondIgredientDataSource,
        
                        ]
                    },
                    xAxis: [
                        { type: 'category', gridIndex: 0 },
        
                    ],
                    yAxis: [
                        { gridIndex: 0 },
                    ],
                    grid: [
                        { bottom: '55%' },
                        { top: '55%' }
                    ],
                    series: [
                        // These series are in the first grid.
                        { type: 'bar', seriesLayoutBy: 'row' },
                        { type: 'bar', seriesLayoutBy: 'row' },
                    ]
                };

            })
        });
    }


    formatSource(nutritionData) {
        this.source.push('nutrition');
        for (let nutrition in nutritionData) {
            let label = nutritionData[nutrition].label;
            let unit = nutritionData[nutrition].unit;
            if (this.source.indexOf(label) === -1) {
                this.source.push(label);
                this.units[label] = unit;
            }
        }
    }

    formatFirstIngredientData(ingredient) {
        this.firstIngredientDataSource.push(ingredient);
        let dataSource = this.firstIngredientData;
        for (let label of this.source) {
            for (let dataLabel in dataSource) {
                let sourceLabel = dataSource[dataLabel].label;
                let quantity = dataSource[dataLabel].quantity;
                if (label === sourceLabel) {
                    let index = this.source.indexOf(sourceLabel);
                    this.firstIngredientDataSource[index] = quantity;
                    break;
                }
            }
        }
    }

    formatSecondIngredientData(ingredient) {
        this.secondIgredientDataSource.push(ingredient);
        let dataSource = this.secondIgredientData;
        for (let label of this.source) {
            for (let dataLabel in dataSource) {
                let sourceLabel = dataSource[dataLabel].label;
                let quantity = dataSource[dataLabel].quantity;
                if (label === sourceLabel) {
                    let index = this.source.indexOf(sourceLabel);
                    this.secondIgredientDataSource[index] = quantity;
                    break;
                }
            }
        }
    }


    reset(){
        this.options = {};
        this.source = [];
        this.firstIngredientDataSource = [];
        this.secondIgredientDataSource = [];
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000
        });
    }

}
