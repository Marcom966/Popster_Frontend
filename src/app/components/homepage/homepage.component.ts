import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataInt } from 'src/app/Interfaces/data-int';
import { TypeOfUser } from 'src/app/Interfaces/type-of-user';
import { FetchUsersService } from 'src/app/services/fetch-users.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  data!: any;
  username!: any|null;
  password!: any|null;
  realData!: any[];
  requestSub = new Subscription;
  userName!: string;
  passwordEntry!: string;
  logged: boolean = false;
  name!: string|undefined;
  wrongUser: boolean = false;
  wrongPassword: boolean = false;
  dataToSend!: DataInt;
  typeOfUser!: TypeOfUser;
  dataNew: any[] = [];
  nameLocal: string = "";
  

  constructor(public getUsers: FetchUsersService, public route: Router) { }

  public verify(){
    let arr: any[] = []
    this.username= localStorage.getItem('user_name');    
    this.password = localStorage.getItem('password');
    if(!this.username&&!this.password){
      return
    }else if(this.username&&this.password&&this.nameLocal!=""){
      this.name = localStorage.getItem('nameOfTheUser')?.toString();
      return
    }
    this.requestSub = this.getUsers.getUsers().subscribe((resp)=>{
      let data = Object.entries(resp);
      for(let i=0; i<data.length; i++){
        arr.push(data[i]);
      }
      arr.forEach((element: any)=>{
        Object.values(element).forEach((el: any)=>{
          if(el['user_name']==this.username){
            this.name = el['name'];
            this.logged=true;
            if(this.name!=undefined){
              this.nameLocal = this.name as string;
            }else{
              window.alert("There was an error: name is undefined");
              throw Error("Name is undefined");
            }
            localStorage.setItem('nameOfTheUser', this.nameLocal);
          }else{
            return
          }
        });          
      });         
    });
  };
  public createItem(){
    
  }

  public logOut(){
    localStorage.clear();    
    window.location.reload();
  }
  public logIn(){
    this.route.navigate(['login']);
  }
  public fileUpload(){
    this.route.navigate(['fileUpload']);
  }
  public redirect(){
    this.route.navigate(['fileUploadError']);
  }
  ngOnDestroy(): void{
    this.requestSub.unsubscribe();
  }
  ngOnInit(): void {
    this.verify();
  }

}
