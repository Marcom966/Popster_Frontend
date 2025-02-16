import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'app-audio-player-component',
  imports: [],
  templateUrl: './audio-player-component.component.html',
  styleUrl: './audio-player-component.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudioPlayerComponentComponent {
  @Input() url!: any;
  @Input() name!: any;
  playlist = [
    {
      title: this.name,
      link: this.url
    }
  ];
  constructor() { }
  public playAudio() {
  console.log(this.playlist[0].link);

    let audio = new Audio();
    audio.src = this.playlist[0].link;
    audio.load();
    audio.play();
  }
  

  ngOnInit(): void {
    this.playAudio();
  }
  


}
