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
  @Input() link!: string;
  @Input() name!: string;
  @Input() id!: string;
  @Input() file!: Blob;
  playlist: Track[] = [];
  requestSub = new Subscription();
  linkDue!: string;
  noLink: boolean = false;
  pressPlay: boolean = false;
  notRecognized: boolean = false;
  audioUrl: string | null = null;
  audio: HTMLAudioElement | null = null;

  constructor() { }

  public playAudio() {
    if(!this.link){
      console.error('nessun link disponibile');
      this.noLink = true;
      return    
    }

    try {
      if (this.audio) {
        this.audio.pause();
        this.audio.src = '';
      }
      this.audio = new Audio();
      this.audio.addEventListener('error', (e) => {
        console.error('Errore nel caricamento audio:', e);
        console.error('URL dell\'audio:', this.link);
        this.notRecognized = true;
      });

      this.audio.addEventListener('loadeddata', () => {
        console.log('Audio caricato con successo');
        this.audio!.volume = 1;
        
        if (this.pressPlay) {
          this.audio!.play().then(() => {
            console.log('audio played successfully');
          }).catch(error => {
            console.error('audio not played:', error);
            this.pressPlay = true;
          });
        }
      });
      this.audio.src = this.link;
      this.audio.load();
      this.playlist = [{
        title: this.name,
        link: this.link,
        artist: 'demo',
        duration: 0
      }];

      console.log('sto riproducendo:', this.name, 'URL:', this.link);
    } catch (error) {
      console.error('Errore nella creazione dell\'audio:', error);
      this.notRecognized = true;
    }
  }

  public onEnded(event: any){
    console.log(event);
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
  }
}
