import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FetchUsersService } from 'src/app/services/fetch-users.service';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  username!: string;
  users!: any[];
  requestSub = new Subscription;
  name!: any;
  size!: any;
  type!: any;


  constructor(private route: Router, private getUser: FetchUsersService, private files: PostFileServiceService) { }

  public main(){
    this.requestSub = this.getUser.getUsers().subscribe((resp)=>{
      this.users = resp;
      this.users.forEach(user=>{
          this.username = user.user_name;
      });
    })   
  }
  public onChangeFile(event: any){
    let file: File = event.target.files[0];
    if(file){
      this.name = file.name;
      this.size = file.size;
      this.type = file.type;
    }

  }
  public onSubmit(){
    this.requestSub = this.files.postFile(this.name, this.size, this.type).subscribe((resp)=>{
      console.log(resp);
    })
  }
  public toUser(){
    this.route.navigate(['userHomepage']);
  }
  public back(){
    this.route.navigate(['homepage']);
  }

  ngOnInit(): void {
    this.main();
  }

}
