import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FetchUsersService } from 'src/app/services/fetch-users.service';
import { Router } from '@angular/router';

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
  userName!: string;
  subscrption = new Subscription();

  constructor(private getUserEmail: FetchUsersService, private route: Router) { 
    emailjs.init("0eji7tf7oVZK4QVIk");
  }


  public onSubitSupport(form: NgForm){
    this.name = form.value.name;
    this.email = form.value.username;
    this.error = form.value.error+'Popster error message from user: ';
    this.attachments = form.value.attachments;
    if(localStorage.getItem('user_name')!=null){
      this.username = localStorage.getItem('user_name')!;
      this.subscrption = this.getUserEmail.returnSpecificUser(this.username).subscribe((data)=>{
        this.userName = data;
        console.log('username e data: '+this.userName, data);
        this.sendEmail(); 
      });
    }else{
      this.userName = '';
      this.sendEmail();
    }
  }
  private sendEmail(){
    const templateParams = {
      name: this.name,
      userName: this.username,
      message: this.error,
      email: this.attachments,
    };
  
    emailjs.send("service_hi8rinj","template_gezu61v",templateParams)
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    }, (error) => {
      console.error('Error sending email:', error);
    })
  }
  public fileHandler(event: any) {
    
  }
  public goBack(){
    this.route.navigate(['/home']);
  }

}
