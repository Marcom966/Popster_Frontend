import { Component, CUSTOM_ELEMENTS_SCHEMA, input, Input, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Track } from 'ngx-audio-player';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

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
      if (this.audioUrl) {
        URL.revokeObjectURL(this.audioUrl);
      }
      this.http.get(this.link, { responseType: 'blob' }).subscribe(
        (blob: Blob) => {
          this.audioUrl = URL.createObjectURL(blob);
          this.audio = new Audio();
          this.audio.src = this.audioUrl;
          
          this.audio.addEventListener('error', (e) => {
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
          this.audio.load();
          this.playlist = [{
            title: this.name,
            link: this.audioUrl,
            artist: 'demo',
            duration: 0
          }];

          console.log('sto riproducendo:', this.name);
        },
        (error) => {
          console.error('Errore nel fetch del file audio:', error);
          this.notRecognized = true;
        }
      );
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
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
  }
}
