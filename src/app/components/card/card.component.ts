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
  @Input() data!: DataInt;
  name!: string;
  requestSub = new Subscription;



  constructor(private getFiles: PostFileServiceService) { }
  public listData(){
    this.name = this.data.name.toString();
    this.requestSub = this.getFiles.getAllFiles().subscribe((res)=>{
      console.log(res); 
    });
    
  }

  ngOnInit(): void {
    this.listData();
  }

}
