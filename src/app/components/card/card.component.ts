import { Component, Input, OnInit } from '@angular/core';
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


  constructor(private filegetter: PostFileServiceService) { }
  public listData(){
    this.name = this.data.name.toString();
    this.requestSub = this.filegetter.getFilebyId(this.data.id).subscribe((dataReturn: any)=>{
      this.link = dataReturn.url;
      console.log(this.link);
    })
    
  }
  ngOnDestroy(): void{
    this.requestSub.unsubscribe();
  }
  ngOnInit(): void {
    this.listData();
  }

}
