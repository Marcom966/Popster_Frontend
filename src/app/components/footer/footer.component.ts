import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent implements OnInit {
  username!: string|null;

  constructor(private route: Router) { }

  public main():void{
    this.username = localStorage.getItem('user_name');
  }
  public toUserPage():void{
    this.route.navigate(['/userDetails']);
  }

  public toAllFilesPage():void{
    this.route.navigate(['/userHomepage']);
  }
  
  ngOnInit(): void {
    this.main();
  }

}
