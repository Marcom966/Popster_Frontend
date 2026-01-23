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
  pageName!: string|null;
  lenght!: string|null;

  constructor(private route: Router) { }

  public main():void{
    this.username = localStorage.getItem('user_name');
    this.pageName = localStorage.getItem('page_name');
    this.lenght = localStorage.getItem('length_of_file_array');
    
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
