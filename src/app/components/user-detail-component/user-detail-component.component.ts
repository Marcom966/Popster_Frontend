import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FetchUsersService } from 'src/app/services/fetch-users.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-user-detail-component',
  imports: [CommonModule],
  templateUrl: './user-detail-component.component.html',
  styleUrl: './user-detail-component.component.css'
})
export class UserDetailComponentComponent {
  isLoading: boolean = false;
  username!: string;
  requestSub = new Subscription();
  name!: string;
  surname!: string;
  birth!: Date;
  eMail!: string;
  password!: string; 
  nickname!: string;
  role!: string;
  constructor(private route: Router, private getTheuser: FetchUsersService) { }

  public main(){
    this.username = localStorage.getItem('user_name') || '';
    this.requestSub = this.getTheuser.returnSpecificUser(this.username)
    .pipe(
      catchError(error=> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('An error occurred while fetching the user.'));
      }),    
      finalize(()=>{
        this.isLoading = false; 
      })
    )
    .subscribe(resp=>{
      this.name = resp['name'];
      this.surname = resp['surname'];
      this.birth = resp['birth'];
      this.eMail = resp['eMail'];
      this.password = resp['password'];
      this.nickname = resp['user_name'];
      this.role = resp['role'];
      
    })
  }

  public backTotheHomepage() {
    this.route.navigate(['/homepage']);
  }
  public backtoUserFiles() {
    this.route.navigate(['/userHomepage']);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.main();
  }

}
