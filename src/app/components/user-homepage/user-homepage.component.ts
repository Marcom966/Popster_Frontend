import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-homepage',
    templateUrl: './user-homepage.component.html',
    styleUrls: ['./user-homepage.component.css'],
    standalone: false
})
export class UserHomepageComponent implements OnInit {
  username!: string|null;
  public main(){
    this.username = localStorage.getItem('user_name');
  }

  constructor() { }

  ngOnInit(): void {
    this.main();
  }

}
