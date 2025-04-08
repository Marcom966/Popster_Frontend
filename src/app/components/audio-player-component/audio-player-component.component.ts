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
  audioUrl: string | null = null;
  audio: HTMLAudioElement | null = null;
  state!: StreamState;
  linkDue2!: string;

  constructor(private http: HttpClient, private audioService: AudioPlayerServiceService) { }

  public playAudio() {
    if(!this.link){
      console.error('nessun link disponibile');
      this.noLink = true;
      return    
    }
    this.linkDue2 = this.link+'/download';
    this.audioService.getState().subscribe((state: StreamState) => {
      this.state = state;
    });
  }
  playStream(url: any){
    this.audioService.playStream(url).subscribe((event: any) => {
      
      console.log(event);
    });
  }
  pause(){
    this.audioService.pause();
  }
  play(){
    this.audioService.play();
  }
  stop(){
    this.audioService.stop();
  }
  mute(){
    this.audioService.mute();
  }
  unmute(){
    this.audioService.unmute();
  }
  onSliderChangeEnd(change: any){
    this.audioService.seekTo(change.value);
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

  ngOnInit(): void{
    this.playStream(this.link);
    this.pause();
    this.playAudio();
  }

}
