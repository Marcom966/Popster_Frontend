import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-audio-player-component',
  imports: [],
  templateUrl: './audio-player-component.component.html',
  styleUrl: './audio-player-component.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudioPlayerComponentComponent {
  @Input() link!: any;
  @Input() name!: any;
  playlist = 
    {
      title: this.name,
      link: this.link
    };
  constructor() { }
  public playAudio() {
  console.log('sto riproducendo:'+ this.playlist.title +' '+this.playlist.link);
    let audio = new Audio();
    audio.src = this.playlist.link;
    audio.load();
    audio.play();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['link']&&changes['link'].currentValue){
      this.playlist.link = changes['link'].currentValue;
      console.log('new link', this.playlist.link);
      this.playAudio();
    }if (changes['name'] && changes['name'].currentValue) {
      this.playlist.title = changes['name'].currentValue;
      console.log("Aggiornato name:", this.playlist.title);
    }
  }
  ngOnInit(): void {
    this.playAudio();
  }
  


}
