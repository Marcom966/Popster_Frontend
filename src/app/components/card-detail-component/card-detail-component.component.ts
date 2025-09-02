import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-detail-component',
  imports: [],
  templateUrl: './card-detail-component.component.html',
  styleUrl: './card-detail-component.component.css'
})
export class CardDetailComponentComponent {
  username!: string|null;
  constructor(private route: Router) {}

  public main(){
    this.username = localStorage.getItem('user_name');
  }
  public backToHome(){
    this.route.navigate(['/home']);
  }
  ngOnInit() {
    this.main();
  }

}
