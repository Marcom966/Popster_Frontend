import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-file-successfull',
  templateUrl: './file-successfull.component.html',
  styleUrls: ['./file-successfull.component.css']
})
export class FileSuccessfullComponent implements OnInit {

  constructor(private route: Router) { }
  public toUpload(){
    this.route.navigate(['fileUpload']);
  }

  ngOnInit(): void {
    setTimeout(()=>this.toUpload(), 5000);
  }
}
