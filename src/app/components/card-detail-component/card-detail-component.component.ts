import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FileDataInterface } from 'src/app/Interfaces/file-data-interface';
import { StreamState } from 'src/app/Interfaces/stream-state';
import { AudioPlayerServiceService } from 'src/app/services/audio-player-service.service';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faPlay, faPause, faStop, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from '../footer/footer.component';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-card-detail-component',
  imports: [CommonModule, FaIconComponent, FontAwesomeModule, FormsModule],
  templateUrl: './card-detail-component.component.html',
  styleUrl: './card-detail-component.component.css',
})
export class CardDetailComponentComponent {
  @Input() dataToPlay!: FileDataInterface;
  @ViewChild('formChangeFile') formChangeFile!: NgForm;
  username!: string|null;
  password!: string|null;
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
  clicked: boolean = false;
  artistName!: string;
  songName!: string;
  formData = new FormData();
  buttonType: string = 'button';
  artistNameNew!: string;
  songNameNew!: string;
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
  constructor(private route: Router, public audioService: AudioPlayerServiceService, private ToDeleteFile: PostFileServiceService) {}

  private destroy$ = new Subject<void>();
  private audioUrl: string | null = null;
  private dragging: boolean = false;

  public main(){
    this.username = localStorage.getItem('user_name');
    this.password = localStorage.getItem('password');
    this.dataName = localStorage.getItem('dataname');
    this.dataId = localStorage.getItem('dataid');
    this.dataArtistName = localStorage.getItem('dataartistname');
    this.dataSongName = localStorage.getItem('datasongname');
    this.dataUserName = localStorage.getItem('datausername');
    this.dataLink = localStorage.getItem('datalink');
    if(!this.dataId||!this.dataLink){
      this.noLink = true;
      return;
    }
  }



  public playAudio() {
    const request = indexedDB.open('fileStorage',1);
    request.onerror = (event: any)=>{
      window.alert("indexedDb run into an error while opening: "+ event.target.error);
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
          this.audioUrl = URL.createObjectURL(result.blob);
          this.playStream(this.audioUrl);
        }else{
          window.alert('no file found for ID ' + this.dataId);
          this.noLink = true;
        }
      db.close();
      };
      getReq.onerror = (error: any)=>{
        window.alert('an error encourred while recovering the file: ' + error);
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
          if(event.type === 'error'){
            window.alert('An error enourred while playing: ' + event);
            this.notRecognized = true;  
          }
        },
        error: error=>{
          window.alert('An error occurred while playing the audio: ' + error);
          this.notRecognized = true;
        }
      });
  }

  public pause() {
    this.audioService.pause();
  }

  public play() {
    this.audioService.play();
  }

  public stop() {
    this.audioService.stop();
  }

  public mute() {
    this.audioService.mute();
  }

  public unmute() {
    this.audioService.unmute();
  }

  public onSliderChange(event: any) {
    this.dragging = true;
  }

  public onSliderChangeEnd(event: any) {
    let time = Number(event.target.value);
    if(Number.isFinite(time)){
      this.audioService.seekTo(time);
    }
    this.dragging = false;
  }

  public goToUserHomepage(){
    this.route.navigate(['/userHomepage']);
    localStorage.setItem('user_name_that_uploaded', this.dataUserName!);
  }

  public backToHome(){
    this.route.navigate(['/home']);
  }

  public deleteFile(){
    if (this.dataId) {
      this.requestSub = this.ToDeleteFile.deleteFileById(this.dataId).subscribe(async(resp)=>{
        let message = resp['message'];
        if(message.includes('has been successfully deleted')){
          window.alert('File deleted successfully.');
          URL.revokeObjectURL(this.audioUrl!);
          this.noLink = true;
        }
        try{
          await this.deleteFromIndexedDB(this.dataId!);
        }catch(err){
          console.error("An error uncurred while deleting from IndexedDB:", err);
          window.alert('File deleted from server, but error occurred while deleting from local storage.');
        }
        localStorage.removeItem('dataname');
        localStorage.removeItem('dataid');
        localStorage.removeItem('dataartistname');
        localStorage.removeItem('datasongname');
        localStorage.removeItem('datalink');
        localStorage.removeItem('datausername');
      });
    } else {
      window.alert('Error: dataId is null or undefined.');
    }
  }

  public changeFile(){
    this.clicked = true;
    this.buttonType = 'submit';
  }


  public saveChangesForm(form: NgForm){
    this.artistName = form.value.artistNameInput;
    this.songName = form.value.songNameInput;
    this.formData.append('artistName', this.artistName);
    this.formData.append('songName', this.songName);
  }


  public saveChanges(){
    this.formChangeFile.valid ? this.saveChangesForm(this.formChangeFile) : window.alert('The form is not valid');
    this.requestSub = this.ToDeleteFile.changeFileById(this.dataId!, this.formData).subscribe(resp=>{
      this.artistNameNew = resp['body']['artistName'];
      this.songNameNew = resp['body']['songName'];
      if((this.artistNameNew==null||this.artistNameNew=='')||(this.songNameNew==null||this.songNameNew=='')){
        window.alert('Fields are still empty. No changes made.');
        this.clicked = false;
        this.buttonType = 'button';
        return;
      }
      window.alert('File changed successfully.');
      this.clicked = false;
      this.buttonType = 'button';
    });
  }


  public downloadFile(){
    this.requestSub = this.ToDeleteFile.getFilebyId(this.dataId!).subscribe(resp=>{
      const blob = new Blob([resp], {type: 'application/octet-stream'});
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = this.dataName || 'downloaded_file';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);   
    });
  }

  private deleteFromIndexedDB(id: string): Promise<void>{
    return new Promise((resolve, reject)=>{
      const request = indexedDB.open('fileStorage',1);
      request.onerror = ()=>{
        reject("errore nell'aperura di IndexedDb");
      };
      request.onsuccess = (event: any)=>{
        const db = event.target.result;
        const trans = db.transaction(['files'], 'readwrite');
        const store = trans.objectStore('files');
        const deleteReq = store.delete(id);
        deleteReq.onsuccess = ()=>{
          console.log('file eliminato con successo da IndexedDB:', id);
          resolve();
        };
        deleteReq.onerror = ()=>{
          reject("errore nell'eliminazione del file da IndexedDB");
        };
      };
    });
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
