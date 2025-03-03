import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
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


  constructor(private filegetter: PostFileServiceService) { }
  public listData(){
    this.name = this.data.name.toString();
    this.requestSub = this.filegetter.getFilebyIdJson(this.data.id).subscribe(async (dataReturn: any)=>{
      this.id = await dataReturn.id.toString();
      this.link =  await dataReturn.url.toString();
      this.blob = new Blob([JSON.stringify(await dataReturn.data)], {type:await dataReturn.type});
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
