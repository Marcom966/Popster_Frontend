import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgForm,FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';

@Component({
  selector: 'app-searchcomponenmt',
  imports: [FaIconComponent, FormsModule],
  templateUrl: './searchcomponenmt.component.html',
  styleUrl: './searchcomponenmt.component.css',
})
export class SearchcomponenmtComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  stringToSearch: string = "";
  requestSub: Subscription = new Subscription();

  constructor(public getfiles: PostFileServiceService) {}

  public search(form: NgForm): void {
    this.stringToSearch = form.value.searchText;
    this.requestSub = this.getfiles.getAllFiles().subscribe((resp) => {
      
    });

  }

}
