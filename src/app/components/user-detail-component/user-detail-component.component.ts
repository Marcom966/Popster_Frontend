import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FetchUsersService } from 'src/app/services/fetch-users.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, finalize, throwError } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-detail-component',
  imports: [CommonModule, FormsModule],
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
  clickedForm: boolean = false;
  logged: boolean = false;
  updateName!: string;
  updateSurname!: string;
  updateEmail!: string;
  updatePassword!: string;
  updateNickname!: string;
  changingPassword: boolean = false;
  user_id!: any;
  data: FormData = new FormData();
  buttontype = 'button';
  constructor(private route: Router, private getTheuser: FetchUsersService) { }

  public main(){
    this.username = localStorage.getItem('user_name') || '';
    this.username ? this.logged = true : this.logged = false;
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
      this.user_id = resp['user_id'];
    })
  }

  public saveChangesUser(formChangeUser: NgForm) {
    console.log("save changes");
    
    if (formChangeUser.valid) {
      console.log("dentro if");
      
      this.updateName = formChangeUser.value.artistNameInput || this.name;
      this.data.append('name', this.updateName);
      this.updateSurname = formChangeUser.value.artistSurnameInput || this.surname;
      this.data.append('surname', this.updateSurname);
      this.updateEmail = formChangeUser.value.artistEmailInput || this.eMail;
      this.data.append('eMail', this.updateEmail);
      this.updateNickname = formChangeUser.value.artistNicknameInput || this.nickname;
      this.data.append('user_name', this.updateNickname);
      this.updatePassword = formChangeUser.value.artistPasswordInput || this.password;
      this.data.append('password', this.updatePassword);
    }
    console.log(this.data);
    
  }



  public saveChanges(){
    this.requestSub = this.getTheuser.updateUser(this.data, this.user_id)
    .pipe(
      catchError(error=> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('An error occurred while updating the user.'));
      })
    )
    .subscribe(resp => {
      if(resp==null){
        window.alert("User details updated successfully.");
        this.route.navigate(['homepage']);
      };
    });
    this.buttontype = 'button';
  }


  public deleteUser(){
    this.requestSub = this.getTheuser.deleteUser(this.user_id)
    .pipe(
      catchError(error=> {
        console.error('Error occurred:', error);
        return throwError(() => new Error('An error occurred while deleting the user.'));
      })
    )
    .subscribe(resp => {
      if(resp==null){
        //window.alert("User deleted successfully.");
        //this.route.navigate(['/homepage']);
      };
    });
  }


  public attentionPassword(){
    this.changingPassword = true;
    window.alert("YOU ARE ABOUT TO CHANGE YOUR PASSWORD!");
  }


  public changeUserDetails(){
    this.clickedForm = true;
    this.buttontype = 'submit';
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
