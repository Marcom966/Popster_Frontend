import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-audio-player-component',
  imports: [],
  templateUrl: './audio-player-component.component.html',
  styleUrl: './audio-player-component.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudioPlayerComponentComponent {
  playlist = [
    {
      title: "Canzone 1",
      link: "assets/audio/musica1.mp3"
    },
    {
      title: "Canzone 2",
      link: "assets/audio/musica2.mp3"
    }
  ];


}
