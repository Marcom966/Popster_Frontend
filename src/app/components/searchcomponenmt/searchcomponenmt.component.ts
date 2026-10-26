import { Component } from '@angular/core';

@Component({
  selector: 'app-searchcomponenmt',
  imports: [],
  templateUrl: './searchcomponenmt.component.html',
  styleUrl: './searchcomponenmt.component.css',
})
export class SearchcomponenmtComponent {
  public search(): void {
    console.log('Search button clicked');
  }

}
