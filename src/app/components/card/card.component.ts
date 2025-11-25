import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subscription, throwError } from 'rxjs';
import { DataInt } from 'src/app/Interfaces/data-int';
import { FileDataInterface } from 'src/app/Interfaces/file-data-interface';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    standalone: false
})
export class CardComponent implements OnInit {
  @Input() data!: any;
  name!: string;
  artistNamw!: string;
  songName!: string;
  requestSub = new Subscription;
  id!: string;
  link!: string;
  dataSendToxard!: any;
  blob!: Blob;
  errorNew: boolean = false;
  username!: string|null;
  datatoPassDown!: FileDataInterface;


  constructor(private filegetter: PostFileServiceService, public route: Router) { }
  public listData(){
    this.name = this.data.name.toString();
    this.requestSub = this.filegetter.getFilebyIdJson(this.data.id, {responseType: 'blob', observe: 'response'})
    .pipe(catchError(error=>{
      return throwError(()=>{
        new Error(error)
        if(error.message.toString().includes('file was in an uncompatible format')){
          this.errorNew = true;
        }
      });
    }))
    .subscribe(async (dataReturn: any)=>{
      this.id = await dataReturn['id'].toString();
      this.link =  await dataReturn['url'].toString()+'/download';
      this.artistNamw = await dataReturn['artistName'].toString();
      this.songName = await dataReturn['songName'].toString();
      this.username = await dataReturn['usernName'].toString();
      this.filegetter.getFilebyId(this.id).subscribe(async (blobData: Blob) => {
        let mime = dataReturn['type'];
        if(!blobData.type && mime){
          this.blob = new Blob([await blobData.arrayBuffer()], { type: mime});
        }else{
          this.blob = blobData;
        }
      });
    }) 
  }
  
  public goToDetails(){
    const request = window.indexedDB.open('fileStorage', 1);
    request.onupgradeneeded = (event: any)=>{
      const db = event.target.result;
      if(!db.objectStoreNames.contains('files')){
        db.createObjectStore('files', {keyPath: 'myKey'});
      }
    }
    request.onsuccess = (event: any)=>{
      const db = event.target.result;
      const trans = db.transaction('files', 'readwrite');
      const store = trans.objectStore('files');
      const toStiore = {
        myKey: this.id,
        name: this.name,
        artist: this.artistNamw,
        song: this.songName,
        blob: this.blob
      };
      const ptReq= store.put(toStiore);
      ptReq.onsuccess = ()=>{
        console.log('IndexedDb write completed');
        this.route.navigate(['songDetails']);
        localStorage.setItem('dataname', this.name);
        localStorage.setItem('dataid', this.id);
        localStorage.setItem('dataartistname', this.artistNamw);
        localStorage.setItem('datasongname', this.songName);
        localStorage.setItem('datausername', this.username? this.username : 'unknown');
        localStorage.setItem('datalink', this.link);
      };
      ptReq.onerror = (e: any)=>{
        console.error('Error storing data in IndexedDB:', e.target.errorCode);
      };
      trans.oncomplete = ()=>{
        db.close();
      };
      request.onerror = (event: any) => {
        console.error('IndexedDB open error:', event.target.error);
      };

    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['id']&&changes['id'].currentValue){
      this.id = changes['id'].currentValue;
    }
  }
  ngOnDestroy(): void{
    this.requestSub.unsubscribe();
  }
  ngOnInit(): void {
    this.listData();
  }


};

