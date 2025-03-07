import { Component, CUSTOM_ELEMENTS_SCHEMA, input, Input, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';

@Component({
  selector: 'app-audio-player-component',
  imports: [],
  templateUrl: './audio-player-component.component.html',
  styleUrl: './audio-player-component.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudioPlayerComponentComponent {
  @Input() link!: any;
  @Input() name!: any;
  @Input() id!: any;
  @Input() file!: Blob;
  playlist: any = {};
  requestSub = new Subscription();
  linkDue!: any;
  noLink: boolean = false;
  pressPlay: boolean = false;


  constructor() { }


  public playAudio() {
    if(!this.link){
      console.error('nessun link disponibile');
      this.noLink = true;
      return    
    }
  
  this.linkDue = window.URL.createObjectURL(this.file);

  console.log(this.linkDue+"TIPO: "+typeof(this.file));
  console.log('sto riproducendo:'+ this.name +' '+this.link);
  let audio = new Audio();
  audio.src = this.linkDue;
  audio.load();
  audio.volume = 1;
  audio.play().then(()=>{
      console.log('audio played sucessfully');
    }).catch((error)=>{
      console.error('audio not played, the browser, user interaction is required: '+error);
      this.pressPlay = true;
    });
  }
  ngOnInit(): void {
    this.playAudio();
  }
}
