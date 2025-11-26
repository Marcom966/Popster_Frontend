import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FileDataInterface } from 'src/app/Interfaces/file-data-interface';
import { StreamState } from 'src/app/Interfaces/stream-state';
import { AudioPlayerServiceService } from 'src/app/services/audio-player-service.service';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faPlay, faPause, faStop, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-card-detail-component',
  imports: [CommonModule, FaIconComponent,FontAwesomeModule],
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
  faPlayIcon!: any;
  faPauseIcon!: any;
  faStopIcon!: any;
  faVolumeMuteIcon!: any;
  faVolumeUpIcon!: any;
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
  constructor(private route: Router, private http: HttpClient, public audioService: AudioPlayerServiceService) {}

  private destroy$ = new Subject<void>();
  private audioUrl: string | null = null;
  private dragging: boolean = false;

  public main(){
    this.username = localStorage.getItem('user_name');
    this.dataName = localStorage.getItem('dataname');
    this.dataId = localStorage.getItem('dataid');
    this.dataArtistName = localStorage.getItem('dataartistname');
    this.dataSongName = localStorage.getItem('datasongname');
    this.dataUserName = localStorage.getItem('datausername');
    this.dataLink = localStorage.getItem('datalink');
  }




  public playAudio() {
    const request = indexedDB.open('fileStorage',1);
    request.onerror = (event: any)=>{
      console.error("errore nell'apertura di indexedDb", event.target.error);
      this.noLink = true;
    }
    request.onsuccess = (event: any)=>{
      const db = event.target.result;
      const trans = db.transaction(['files'], 'readonly');
      const store = trans.objectStore('files');
      const getReq = store.get(this.dataId);
      getReq.onsuccess = (event: any)=>{
        const result = event.target.result;
        if(result && result.blob){
          console.log('file recuperato con successo:', result);
          this.audioUrl = URL.createObjectURL(result.blob);
          this.playStream(this.audioUrl);
          console.log('blob type: ', result.blob.type);
        }else{
          console.error('nessun file trovato per ID', this.dataId);
          this.noLink = true;
        }
      db.close();
      };
      getReq.onerror = (error: any)=>{
        console.error('errore nel recupero del file', error);
        this.noLink = true;
      };
    }

    console.log('Tentativo di riproduzione audio con ID:', this.dataBlob);

  }

  public playStream(url: string){
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

  public pause() {
    console.log('Pausa audio');
    this.audioService.pause();
  }

  public play() {
    console.log('Ripresa audio');
    this.audioService.play();
  }

  public stop() {
    console.log('Stop audio');
    this.audioService.stop();
  }

  public mute() {
    console.log('Muto audio');
    this.audioService.mute();
  }

  public unmute() {
    console.log('Unmute audio');
    this.audioService.unmute();
  }

  public onSliderChange(event: any) {
    this.dragging = true;
  }

  public onSliderChangeEnd(event: any) {
    let time = Number(event.target.value);
    console.log('Cambio posizione audio:', time);
    if(Number.isFinite(time)){
      this.audioService.seekTo(time);
    }
    this.dragging = false;
  }

  public goToUserHomepage(){
    this.route.navigate(['/userHomepage']);
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
    this.faPlayIcon = faPlay;
    this.faPauseIcon = faPause;
    this.faStopIcon = faStop;
    this.faVolumeMuteIcon = faVolumeMute;
    this.faVolumeUpIcon = faVolumeUp;
    this.main();
    this.audioService.getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: StreamState) => {
        this.state = state;
        console.log('Stato audio aggiornato:', state);
      });
  }


}
