import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'app-audio-player-component',
  imports: [],
  templateUrl: './audio-player-component.component.html',
  styleUrl: './audio-player-component.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudioPlayerComponentComponent {
  @Input() link!: any;
  //@Input() name!: any;
  playlist = 
    {
      //title: this.name,
      link: this.link
    };
  constructor() { }
  public playAudio() {
  console.log(this.playlist.link, this.link);
  //console.log(this.playlist.title, this.name);
  

    let audio = new Audio();
    audio.src = this.playlist.link;
    audio.load();
    audio.play();
  }
  

  ngOnInit(): void {
    this.playAudio();
  }
  


}
