import { Component, CUSTOM_ELEMENTS_SCHEMA, input, Input, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Track } from 'ngx-audio-player';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StreamState } from 'src/app/Interfaces/stream-state';
import { AudioPlayerServiceService } from 'src/app/services/audio-player-service.service';

@Component({
  selector: 'app-audio-player-component',
  imports: [CommonModule],
  templateUrl: './audio-player-component.component.html',
  styleUrl: './audio-player-component.component.css',
  providers: [AudioPlayerServiceService],
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
  state!: StreamState;

  constructor(private http: HttpClient, private audioService: AudioPlayerServiceService) { }

  public playAudio() {
    if(!this.link){
      console.error('nessun link disponibile');
      this.noLink = true;
      return    
    }

    console.log('Tentativo di riproduzione audio con URL:', this.link);

    // Inizializza lo stato dell'audio
    this.audioService.getState().subscribe((state: StreamState) => {
      this.state = state;
      console.log('Stato audio aggiornato:', state);
    });

    // Prepara il file per la riproduzione
    this.playStream(this.link);
  }

  playStream(url: string) {
    console.log('Avvio riproduzione stream con URL:', url);
    
    this.audioService.playStream(url).subscribe(
      (event: any) => {
        console.log('Evento di riproduzione:', event);
      },
      (error) => {
        console.error('Errore nella riproduzione:', error);
        this.notRecognized = true;
      }
    );
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
    this.stop();
  }
}
