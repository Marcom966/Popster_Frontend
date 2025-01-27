import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subscription, throwError } from 'rxjs';
import { FetchUsersService } from 'src/app/services/fetch-users.service';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css'],
    standalone: false
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
  nameOfficial!: string;
  erroor: boolean = false;
  formData!: FormData;
  res!: unknown;
  


  constructor(private route: Router, private files: PostFileServiceService) { }

  public main(){
    this.username = localStorage.getItem('user_name');
    }
  public onChangeFile(event: any){
    this.formData = new FormData();
    this.file = event.target.files[0];
    if(this.file){
      this.name = this.file.name;
      this.size = this.file.size;
      this.type = this.file.type;
      this.formData.append('fileSize', this.size);
      this.formData.append('fileType', this.type);
      this.userName = this.username;
      this.nameOfficial = this.name;
      if(this.nameOfficial.includes(" ")){
        this.nameConcat = this.nameOfficial.split(" ").join("");
      }
      this.formData.append('file', new Blob([JSON.stringify(this.nameConcat ? this.nameConcat : this.nameOfficial)], {type: 'multipart/form-data'}));
      this.formData.append('userName', this.userName ?? '');      
    }else if(this.file==null){
      return
    }    
  }
  public onSubmit(){
    this.requestSub = this.files.postFile(this.formData)
    .pipe(catchError(err=>{
      return throwError(()=>{
        if(err.status===0){
          console.error("an error occurred: "+err.error);
        }else if(err.status===400){
          let er = Object.values(err);
          console.error(`Backend returned code ${err.status}, body was: `+er)
        }
      });
    }))
    .subscribe(resp=>{
      this.res = Object.values(resp)[0];
      if((this.res as string).includes("File Uploaded successfully")){
        this.subscribed = true;
        this.toCongrats('fileSuccessfull');
      }
    });
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
