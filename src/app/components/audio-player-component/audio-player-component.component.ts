import { Component, CUSTOM_ELEMENTS_SCHEMA, input, Input, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Track } from 'ngx-audio-player';
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
  playlist: Track[] = [];
  requestSub = new Subscription();
  linkDue!: any;
  noLink: boolean = false;
  pressPlay: boolean = false;
  notRecognized: boolean = false;


  constructor() { }


  public playAudio() {
    if(!this.link){
      console.error('nessun link disponibile');
      this.noLink = true;
      return    
    }
    if(this.file.type.includes('not recognized')){
      this.notRecognized = true;
      return
    }
    this.playlist.push({
      title: this.name,
      link: this.link,
      artist: 'demo',
      duration: 0
    });

  console.log(this.link+"TIPO: "+typeof(this.file));
  console.log('sto riproducendo:'+ this.name +' '+this.link);
  let audio = new Audio();
  audio.src = this.link;
  audio.load();
  audio.volume = 1;
  audio.play().then(()=>{
      console.log('audio played sucessfully');
    }).catch((error)=>{
      console.error('audio not played, the browser, user interaction is required: '+error);
      console.log(error.message);
      
      this.pressPlay = true;
    });
  }
  public onEnded(event: any){
    console.log(event);
  }
  ngOnInit(): void {
    this.playAudio();
  }
}
