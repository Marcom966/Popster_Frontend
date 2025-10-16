import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FileDataInterface } from 'src/app/Interfaces/file-data-interface';

@Component({
  selector: 'app-card-detail-component',
  imports: [],
  templateUrl: './card-detail-component.component.html',
  styleUrl: './card-detail-component.component.css'
})
export class CardDetailComponentComponent {
  @Input() dataToPlay!: FileDataInterface;
  username!: string|null;
  dataToPassInterface!: FileDataInterface;
  dataName!: string|null;
  dataId!: string|null;
  dataArtistName!: string|null;
  dataSongName!: string|null;
  dataUserName!: string|null;
  dataLink!: string|null;
  dataBlob!: string|null;
  constructor(private route: Router) {}

  public main(){
    this.username = localStorage.getItem('user_name');
    this.dataName = localStorage.getItem('dataName');
    this.dataId = localStorage.getItem('dataId');
    this.dataArtistName = localStorage.getItem('dataArtistName');
    this.dataSongName = localStorage.getItem('dataSongName');
    this.dataUserName = localStorage.getItem('dataUserName');
    this.dataLink = localStorage.getItem('dataLink');
    this.dataBlob = localStorage.getItem('datablob');
    console.log(this.dataBlob);
    
  }
  public backToHome(){
    this.route.navigate(['/home']);
  }
  ngOnInit() {
    this.main();
  }

}
