import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-searchcomponenmt',
  imports: [FaIconComponent],
  templateUrl: './searchcomponenmt.component.html',
  styleUrl: './searchcomponenmt.component.css',
})
export class SearchcomponenmtComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  public search(): void {
    console.log('Search button clicked');
  }

}
