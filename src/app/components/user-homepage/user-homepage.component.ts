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

  constructor(public http: HttpClient, public getfiles: PostFileServiceService, private route: Router) { }

  public main(){
    this.username = localStorage.getItem('user_name');
    this.requsestSub = this.getfiles.getAllFiles()
    .pipe(catchError((error)=>{
      return throwError(()=>{
        if(error){
          this.noFiles = true;
        }});
    }))
    .subscribe(resp=>{
      this.response = resp;
      this.response.forEach((element: any)=>{
        if(element['usernName']==this.username){
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

  ngOnInit(): void {
    this.main();
  }

}
