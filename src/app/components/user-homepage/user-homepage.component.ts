import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subscription, throwError } from 'rxjs';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';

@Component({
    selector: 'app-user-homepage',
    templateUrl: './user-homepage.component.html',
    styleUrls: ['./user-homepage.component.css'],
    standalone: false
})
export class UserHomepageComponent implements OnInit {
  username!: string|null;
  requsestSub = new Subscription();
  response: any[] = [];
  data: any[] = [];
  noFiles: boolean = false;
  userNameFromBackend!: string;
  somethingElse: boolean = false;
  userNameFile!: string|null;

  constructor(public http: HttpClient, public getfiles: PostFileServiceService, private route: Router) { }

  public main(){
    this.username = localStorage.getItem('user_name');
    this.userNameFile = localStorage.getItem('user_name_that_uploaded');
    this.requsestSub = this.getfiles.getAllFiles()
    .pipe(catchError((error)=>{
      return throwError(()=>{
        if(error.toString().includes('0')){
          this.noFiles = true;
        }else if(error.status==400){
          this.somethingElse = true;
        }
      });
    }))
    .subscribe(resp=>{
      this.response = resp;
      this.response.forEach((element: any)=>{
        if(element['usernName']==this.username||element['usernName']==this.userNameFile){
          this.data.push(element);
        }
      });
    })
  }
  public backTotheHomepage(){
    this.route.navigate(['/homepage']);
  }
  public toUserDetails(){
    this.route.navigate(['/userDetails']);
  }
  public toSupport(){
    this.route.navigate(['/support']);
  }
  public redirect(){
    this.route.navigate(['fileUploadError']);
  }
  ngOnInit(): void {
    this.main();
  }
}
