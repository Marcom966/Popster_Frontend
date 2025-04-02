import { Component, CUSTOM_ELEMENTS_SCHEMA, input, Input, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Track } from 'ngx-audio-player';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-player-component',
  imports: [CommonModule],
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
  audioUrl: string | null = null;

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

    // Create object URL from blob
    this.audioUrl = URL.createObjectURL(this.file);
    
    this.playlist.push({
      title: this.name,
      link: this.audioUrl,
      artist: 'demo',
      duration: 0
    });

    console.log('sto riproducendo:'+ this.name +' '+this.audioUrl);
    
    let audio = new Audio();
    audio.src = this.audioUrl;
    audio.load();
    audio.volume = 1;
    
    // Only play if user has interacted with the page
    if (this.pressPlay) {
      audio.play().then(() => {
        console.log('audio played successfully');
      }).catch(error => {
        console.error('audio not played:', error);
        this.pressPlay = true;
      });
    }
  }

  public onEnded(event: any){
    console.log(event);
  }

  ngOnDestroy() {
    // Clean up the object URL when component is destroyed
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
  }
}
