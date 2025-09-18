import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileDataInterface } from 'src/app/Interfaces/file-data-interface';

@Component({
  selector: 'app-card-detail-component',
  imports: [],
  templateUrl: './card-detail-component.component.html',
  styleUrl: './card-detail-component.component.css'
})
export class CardDetailComponentComponent {
  username!: string|null;
  dataToPassInterface!: FileDataInterface;
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
