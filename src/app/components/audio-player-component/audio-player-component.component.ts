import { Component, CUSTOM_ELEMENTS_SCHEMA, input, Input, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, takeUntil, Subject } from 'rxjs';
import { Track } from 'ngx-audio-player';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StreamState } from 'src/app/Interfaces/stream-state';
import { AudioPlayerServiceService } from 'src/app/services/audio-player-service.service';
import {} from '@fortawesome/angular-fontawesome'

@Component({
  selector: 'app-audio-player-component',
  imports: [CommonModule],
  templateUrl: './audio-player-component.component.html',
  styleUrl: './audio-player-component.component.css',
  providers: [AudioPlayerServiceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudioPlayerComponentComponent implements OnInit, OnDestroy {
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
  state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canPlay: false,
    error: false,
    mute: false
  };

  private destroy$ = new Subject<void>();
  private audioUrl: string | null = null;

  constructor(private http: HttpClient, private audioService: AudioPlayerServiceService) {}

  ngOnInit() {
    this.audioService.getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: StreamState) => {
        this.state = state;
        console.log('Stato audio aggiornato:', state);
      });
  }

  public playAudio() {
    if(!this.link){
      console.error('nessun link disponibile');
      this.noLink = true;
      return    
    }

    console.log('Tentativo di riproduzione audio con URL:', this.link);

    this.http.get(this.link, { 
      responseType: 'blob',
      observe: 'response'
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Risposta ricevuta:', response.url);
          
          const blob = response.body;
          //const blob1 = this.file;
          if (!blob) {
            console.error('Nessun contenuto nel file');
            this.notRecognized = true;
            return;
          }
          const audioBlob = new Blob([blob], { type: 'audio/mpeg' });
          if (this.audioUrl) {
            
            URL.revokeObjectURL(this.audioUrl);
          }
          console.log('audioUrl: ', this.audioUrl);
          
          this.audioUrl = URL.createObjectURL(audioBlob);
          this.playStream(this.audioUrl);
        },
        error: (error) => {
          console.error('Errore nel download del file:', error);
          this.notRecognized = true;
        }
      });
  }

  playStream(url: string) {
    console.log('Avvio riproduzione stream con URL:', url);
    
    this.audioService.playStream(url)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event: any) => {
          console.log('Evento di riproduzione:', event);
        },
        error: (error) => {
          console.error('Errore nella riproduzione:', error);
          this.notRecognized = true;
        }
      });
  }

  pause() {
    console.log('Pausa audio');
    this.audioService.pause();
  }

  play() {
    console.log('Ripresa audio');
    this.audioService.play();
  }

  stop() {
    console.log('Stop audio');
    this.audioService.stop();
  }

  mute() {
    console.log('Muto audio');
    this.audioService.mute();
  }

  unmute() {
    console.log('Unmute audio');
    this.audioService.unmute();
  }

  onSliderChangeEnd(change: any) {
    console.log('Cambio posizione audio:', change.value);
    this.audioService.seekTo(change.value);
  }

  ngOnDestroy() {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
    this.destroy$.next();
    this.destroy$.complete();
    this.stop();
  }
}
