import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { catchError, Subscription, throwError } from 'rxjs';
import { DataInt } from 'src/app/Interfaces/data-int';
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
  requestSub = new Subscription;
  id!: string;
  link!: string;
  dataSendToxard!: any;
  blob!: Blob;
  errorNew: boolean = false;


  constructor(private filegetter: PostFileServiceService) { }
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
      this.id = await dataReturn.id.toString();
      this.link =  await dataReturn.url.toString()+'/download';
      this.filegetter.getFilebyId(this.id).subscribe(async (blobData: Blob) => {
        this.blob = new Blob([blobData], { type: await dataReturn.type });
      });
    }) 
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

}
