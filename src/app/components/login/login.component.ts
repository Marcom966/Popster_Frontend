import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { FetchUsersService } from 'src/app/services/fetch-users.service';
//import { GoogleauthServiceService } from 'src/app/services/googleauth-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent implements OnInit {

  name = "";
  surname = "";
  birthday: Date = new Date();
  email = "";
  nickname = "";
  password = "";
  nameNew!: any;
  passNew!: any;
  nameFromDatabase!: string;
  singleName!: any;
  definitiveUserName!: any;
  definitivePassword!: any;
  pasDue!: string;
  NameAlready!: string;
  passAlready!: string;
  wrongDate: boolean = false;
  isDateWrong: boolean = false;
  samePassword: boolean = false;
  Yes: boolean = false;
  No: boolean = false;
  fakeEmail: boolean = false;
  emailAlreadyExist: boolean = false;
  notNickname: boolean = false;
  notPassword: boolean = false;
  nickAndPassDontMatch: boolean = false;
  requestSub = new Subscription;
  vendor: boolean = false;
  seller: boolean = false;
  pageOpened!: boolean;
  googleAuthService!: any;
  constructor(private route: Router, public fetchUsers: FetchUsersService, public secondFetch: FetchUsersService, /*private googleAuthService: GoogleauthServiceService*/) { }

  public onSubmit(form: NgForm){
    this.name = form.value.FullName;
    this.surname = form.value.Surname;
    this.birthday = form.value.birthday;
    this.email = form.value.eMail;
    this.nickname = form.value.Nickname;
    this.password = form.value.Password;
    this.pasDue = form.value.passwordDue;
    if(this.pasDue!=this.password){
      this.samePassword=true;
    }
    let user_name = this.nickname;
    if(!user_name){
      this.notNickname=true;
    }
    let birth = this.birthday;
    if(!moment(birth).isValid()){
      this.wrongDate=true;
    }
    let eMail = this.email;
    if(!eMail.includes('@')){
      this.fakeEmail=true;
      return
    }
    let name = this.name;
    let surname = this.surname;
    let password = this.password;
    if(!password){
      this.notPassword=true;
    }
    this.requestSub = this.fetchUsers.postUsers(user_name, password, name, surname, birth, eMail)
    .pipe(catchError(err=>{
      return throwError(()=>{
        let error = new Error(err).message.toString();
        if(error.includes('500')){
          this.emailAlreadyExist=true;
        }
      });
    }))
    .subscribe((resp)=>{
      if(resp==null){
        this.Destination('subscribed');
      }
    })
  }
  public onSubmitNew(form: NgForm){
    this.passAlready = form.value.passswordAlready;
    this.NameAlready = form.value.Nickname;
    this.fetchUsers.getUsers().forEach(user=>{
      this.nameNew = user.map((u: any)=>u['user_name']);
      this.passNew = user.map((u: any)=>u['password']);
      this.nameFromDatabase = user.map((u: any)=>u['name']);
      Object.values(this.nameNew).forEach(name=>{
        this.definitiveUserName = name; 
        Object.values(this.passNew).forEach(pass=>{
          this.definitivePassword = pass;
          if(this.NameAlready==this.definitiveUserName&&this.passAlready==this.definitivePassword){
            this.Destination('home');
            localStorage.setItem('user_name', this.NameAlready);
            localStorage.setItem('password', this.passAlready);
          }else{
            this.nickAndPassDontMatch=true;
          }        
        });       
      });  
    });
    
  }
  public onSubmitVendor(){
    this.vendor = true;
    this.Yes = false;
    this.No = false;
  }
  public Destination(destination: String){
    this.route.navigate([destination]);
  }
  public yesFunction(){
    this.Yes=true;
    this.No=false;
  }
  public yesVendor(){
    this.seller = true;
  }
  public noFunction(){
    this.No=true;
    this.Yes=false;
  }
  ngOnDestroy(): void{
    this.requestSub.unsubscribe();
  }
  ngOnInit(): void {
    this.pageOpened = true;
    //this.googleAuthService.initialize();
  }

}
