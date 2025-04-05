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
  audio: HTMLAudioElement | null = null;

  constructor() { }

  public playAudio() {
    if(!this.file){
      console.error('nessun file disponibile');
      this.noLink = true;
      return    
    }

    // Check if the file is actually an audio file
    if(!this.file.type.startsWith('audio/')) {
      console.error('Il file non è un file audio valido:', this.file.type);
      this.notRecognized = true;
      return;
    }

    try {
      // Clean up previous audio URL if exists
      if (this.audioUrl) {
        URL.revokeObjectURL(this.audioUrl);
      }

      // Create new object URL from blob
      this.audioUrl = URL.createObjectURL(this.file);
      
      // Create new audio element
      this.audio = new Audio();
      this.audio.src = this.audioUrl;
      
      // Add event listeners
      this.audio.addEventListener('error', e=> {
        console.error('Errore nel caricamento audio:', e);
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

      // Load the audio
      this.audio.load();

      // Update playlist
      this.playlist = [{
        title: this.name,
        link: this.audioUrl,
        artist: 'demo',
        duration: 0
      }];

      console.log('sto riproducendo:', this.name, 'tipo:', this.file.type);
    } catch (error) {
      console.error('Errore nella creazione dell\'audio:', error);
      this.notRecognized = true;
    }
  }

  public onEnded(event: any){
    console.log(event);
  }

  ngOnDestroy() {
    // Clean up resources
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
  }
}
