import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FetchUsersService } from 'src/app/services/fetch-users.service';

@Component({
  selector: 'app-support-component',
  imports: [FormsModule],
  templateUrl: './support-component.component.html',
  styleUrl: './support-component.component.css',
  standalone: true
})
export class SupportComponentComponent {
  name!: String;
  email!: string;
  error!:string;
  attachments!: File[];
  username!: string;
  subscrption = new Subscription();

  constructor(private getUserEmail: FetchUsersService) { }


  public onSubitSupport(form: NgForm){
    this.name = form.value.name;
    this.email = form.value.username;
    this.error = form.value.error;
    this.attachments = form.value.attachments;
    if(localStorage.getItem('user_name')!=null){
      this.username = localStorage.getItem('user_name')!;
      this.subscrption = this.getUserEmail.returnSpecificUser(this.username).subscribe((data)=>{
        this.username = data;
      });
    }
  }
  public fileHandler(event: any) {
    
  }

}
