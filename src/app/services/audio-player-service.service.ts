import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { StreamState } from '../Interfaces/stream-state';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerServiceService {

  constructor() { }
  
  private stop$: Subject<void> = new Subject<void>();
  private toPlayObject: HTMLAudioElement = new Audio();

  private audioEvents: Array<string> = [
    'ended',
    'pause',
    'play', 
    'playing',
    'waiting',
    'timeupdate',
    'canplay',
    'loadeddata',
    'loadstart',
    'progress',
    'seeking',
    'seeked',
    'stalled',
    'suspend',
    'volumechange',
    'ratechange',
    'durationchange',
    'error',
  ];
  private state: StreamState ={
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canPlay: false,
    error: false,
    mute: false,
  };
  private streamObservable(url: any){
    return new Observable(observer => {
      this.toPlayObject.src = url;
      this.toPlayObject.load();
      this.toPlayObject.play();
      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      }
      this.addEvents(this.toPlayObject, this.audioEvents, handler);
      return () => {
        this.toPlayObject.pause();
        this.toPlayObject.currentTime = 0;
        this.removeEvent(this.toPlayObject, this.audioEvents, handler);
        this.resetState();
      };
    });
  }
  private addEvents(obj: any, events: any, handler: any){
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  };
  private removeEvent(obj: any, events: any, handler: any){
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  };
  playStream(url: any){
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }
  play(){
    this.toPlayObject.play();
    this.state.playing = true;
  }
  pause(){
    this.toPlayObject.pause();
    this.state.playing = false;
  }
  stop(){
    this.stop$.next();
  }
  mute(){
    this.toPlayObject.volume = 0;
    this.state.mute = true;
  }
  unmute(){
    this.toPlayObject.volume = 1;
    this.state.mute = false;
  }
  seekTo(seconds: any){
    this.toPlayObject.currentTime = seconds;
  }
  formatTime(time: number, format: string = 'mm:ss') {
    const momentTime = time*1000;
    return moment.utc(momentTime).format(format);
  }

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject<StreamState>(this.state);

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case 'canPlay':
        this.state.duration = this.toPlayObject.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canPlay = true;
        break;
      case 'playing':
        this.state.playing = true;
        break;
      case 'pause':
        this.state.playing = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.toPlayObject.currentTime;
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
      }
    this.stateChange.next(this.state);
    }
    private resetState(){
      this.state = {
        playing: false,
        readableCurrentTime: '',
        readableDuration: '',
        duration: undefined,
        currentTime: undefined,
        canPlay: false,
        error: false,
        mute: false,
      };
    }
    getState(): Observable<StreamState> {
      return this.stateChange.asObservable(); 
  }
};
