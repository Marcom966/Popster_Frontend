import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload-error',
  templateUrl: './file-upload-error.component.html',
  styleUrls: ['./file-upload-error.component.css']
})
export class FileUploadErrorComponent implements OnInit {

  constructor(private route: Router ) { }

  public gotologin(){
    this.route.navigate(['login']);
  }
  public back(){
    this.route.navigate(['homepage']);
  }

  ngOnInit(): void {
  }

}
