import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FileDataInterface } from 'src/app/Interfaces/file-data-interface';
import { StreamState } from 'src/app/Interfaces/stream-state';
import { AudioPlayerServiceService } from 'src/app/services/audio-player-service.service';

@Component({
  selector: 'app-card-detail-component',
  imports: [CommonModule],
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
  constructor(private route: Router, private http: HttpClient, private audioService: AudioPlayerServiceService) {}

  public main(){
    this.username = localStorage.getItem('user_name');
    this.dataName = localStorage.getItem('dataName');
    this.dataId = localStorage.getItem('dataId');
    this.dataArtistName = localStorage.getItem('dataArtistName');
    this.dataSongName = localStorage.getItem('dataSongName');
    this.dataUserName = localStorage.getItem('dataUserName');
    this.dataLink = localStorage.getItem('dataLink');
    this.dataBlob = localStorage.getItem('datablob');
    
  }


  private destroy$ = new Subject<void>();
  private audioUrl: string | null = null;




  public playAudio() {
    if(!this.dataBlob){
      console.error('nessun ID file disponibile');
      this.noLink = true;
      return    
    }

    console.log('Tentativo di riproduzione audio con ID:', this.dataBlob);

    try {
      const blob = this.dataBlob;
      if (!blob) {
      this.notRecognized = true;
      return;
      }
      this.playStream(blob);
    } catch (error){
      console.error('Errore nella creazione dell\'URL:', error);
      this.notRecognized = true;
    }
  }

  playStream(url: string){
    this.audioService.playStream(url)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(event: any)=>{
          console.log('Evento di riproduzione:', event);
          if(event.type === 'error'){
            console.error('Errore durante la riproduzione:', event);
            this.notRecognized = true;  
          }
        },
        error: error=>{
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

  public backToHome(){
    this.route.navigate(['/home']);
  }

  ngOnDestroy() {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
    this.destroy$.next();
    this.destroy$.complete();
    this.stop();
  }

  ngOnInit() {
    this.main();
    this.audioService.getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: StreamState) => {
        this.state = state;
        console.log('Stato audio aggiornato:', state);
      });
  }


}
