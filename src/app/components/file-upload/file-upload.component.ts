import { O } from '@angular/cdk/observe-content.d-c08bc882';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  idFile!: string;
  resp2!: any;
  artist_name!: string;
  song_name!: string;
  


  constructor(private route: Router, private files: PostFileServiceService) { }

  public main(){
    this.username = localStorage.getItem('user_name');
    } 
  public onChangeFile(form: NgForm, event: any){
    this.artist_name = form.value.artist_name;
    this.song_name = form.value.song_name;
    this.formData = new FormData();
    this.file = event.target.files[0];
    if(this.file){
      this.idFile = crypto.randomUUID();
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
      this.formData.append('file', this.file, this.nameConcat ? this.nameConcat : this.nameOfficial);
      this.formData.append('userName', this.userName ?? '');
      this.formData.append('idFile', this.idFile);
      console.log(this.artist_name);
      console.log(this.song_name);
    
      this.formData.append('artist_name', this.artist_name);
      this.formData.append('song_name', this.song_name);
      
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
      this.res = Object.values(resp)[6];
      this.resp2 = Object.values(this.res as { [key: string]: any })[0];
      if((this.resp2 as string).includes("File Uploaded successfully")){      
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
