import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-support-component',
  imports: [FormsModule],
  templateUrl: './support-component.component.html',
  styleUrl: './support-component.component.css',
  standalone: true
})
export class SupportComponentComponent {
  constructor() { }
  public onSubitSupport(form: NgForm){

  }
  public fileHandler(event: any) {
    
  }

}
