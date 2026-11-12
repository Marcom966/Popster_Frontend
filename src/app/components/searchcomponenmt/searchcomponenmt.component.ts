import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-searchcomponenmt',
  imports: [FaIconComponent],
  templateUrl: './searchcomponenmt.component.html',
  styleUrl: './searchcomponenmt.component.css',
})
export class SearchcomponenmtComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  stringToSearch: string = "";
  public search(form: NgForm): void {
    this.stringToSearch = form.value.searchText;
  }

}
