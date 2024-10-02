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
  username!: string|null;
  users!: any[];
  requestSub = new Subscription;
  name!: any;
  size!: any;
  type!: any;
  clicked: boolean = false;
  nameConcat!: string;
  userName!: string|null;
  file!: File|null;
  subscribed!: boolean;


  constructor(private route: Router, private files: PostFileServiceService) { }

  public main(){
    this.username = localStorage.getItem('user_name');
    }
  public onChangeFile(event: any){
    let Name = "";
    this.file = event.target.files[0];
    if(this.file){
      this.name = this.file.name;
      this.size = this.file.size;
      this.type = this.file.type;
      this.userName = this.username;
      Name = this.name;
      if(Name.includes(" ")){
        this.nameConcat = Name.split(" ").join("");
      }
    }else if(this.file==null){
      return
    }    
  }
  public onSubmit(){
    this.requestSub = this.files.postFile(this.nameConcat, this.size, this.type, this.userName).subscribe((resp)=>{
      if(resp==null){
        this.subscribed = true;
        this.toCongrats('file-successfull');
      }
    })
  }
  public toUser(){
    this.route.navigate(['userHomepage']);
  }
  public back(){
    this.route.navigate(['homepage']);
  }
  public toCongrats(destination: string){
    this.route.navigate([destination])
  }

  ngOnDestroy(): void{
    this.requestSub.unsubscribe();
  }
  ngOnInit(): void {
    this.main();
  }

}
