import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail-component',
  imports: [CommonModule],
  templateUrl: './user-detail-component.component.html',
  styleUrl: './user-detail-component.component.css'
})
export class UserDetailComponentComponent {
  isLoading: boolean = false;

  constructor(private route: Router) { }


  backTotheHomepage() {
    this.route.navigate(['/homepage']);
  }
  backtoUserFiles() {
    this.route.navigate(['/userHomepage']);
  }

}
