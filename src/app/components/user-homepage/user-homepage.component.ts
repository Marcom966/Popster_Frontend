import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {
  public main(){
    return 'ciao';
  }

  constructor() { }

  ngOnInit(): void {
    this.main();
  }

}
