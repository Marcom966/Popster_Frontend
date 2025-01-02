import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-subscribed',
    templateUrl: './subscribed.component.html',
    styleUrls: ['./subscribed.component.css'],
    standalone: false
})
export class SubscribedComponent implements OnInit {

  constructor(private route: Router) { }

  public goToHome(){
    this.Destination('home');
  }

  public Destination(destination: String){
    this.route.navigate([destination]);
  }

  ngOnInit(): void {
  }

}
