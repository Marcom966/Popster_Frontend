import { Component, Input, OnInit } from '@angular/core';
import { DataInt } from 'src/app/Interfaces/data-int';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() data!: DataInt;
  name!: string;


  constructor() { }
  public listData(){
    this.name = this.data.name.toString();
    
  }

  ngOnInit(): void {
    this.listData();
  }

}
