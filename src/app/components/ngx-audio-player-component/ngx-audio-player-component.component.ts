import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { Track } from 'ngx-audio-player'; 

@Component({
  selector: 'app-ngx-audio-player-component',
  imports: [],
  templateUrl: './ngx-audio-player-component.component.html',
  styleUrl: './ngx-audio-player-component.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxAudioPlayerComponentComponent {
  @Input() link!: any;
  @Input() name!: any;
  playlist: Track[] = [];
  constructor() { }

  public onEnded(event: any){
    console.log(event);
    this.playlist.push({
      title: this.name,
      link: this.link,
      artist: 'demo',
      duration: 0
    });
  }

}
