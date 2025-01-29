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
  name!: string;
  requestSub = new Subscription;
  response!: DataInt[];
  res1!: any|undefined;
  toshow!: string;


  constructor(private getFiles: PostFileServiceService) { }
  public listData(){
    //this.name = this.data.name.toString();
    this.requestSub = this.getFiles.getAllFiles().subscribe((res)=>{
      this.response = res;
      
      this.res1 = this.response[0];
      this.toshow = this.res1.name;
      console.log(this.response); 
    });
    
  }
  ngOnInit(): void {
    this.listData();
  }

}
