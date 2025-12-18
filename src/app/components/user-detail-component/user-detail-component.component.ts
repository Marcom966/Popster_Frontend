import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FetchUsersService } from 'src/app/services/fetch-users.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, throwError } from 'rxjs';

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
  constructor(private route: Router, private getTheuser: FetchUsersService) { }

  public main(){
    this.username = localStorage.getItem('user_name') || '';
    this.requestSub = this.getTheuser.returnSpecificUser(this.username)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('An error occurred while fetching the user.'));
      })
    )
    .subscribe(resp=>{
      console.log(resp);
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
