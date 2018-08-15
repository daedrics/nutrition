import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nutrition';

  links = [
    {path: 'recipe',label: 'Recipe'},
    {path: 'ingredient',label: 'Ingredient'},
    {path: 'compare',label: 'Compare'},
  ]

}
