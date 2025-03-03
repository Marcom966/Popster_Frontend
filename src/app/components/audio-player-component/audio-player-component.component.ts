import { Component, CUSTOM_ELEMENTS_SCHEMA, input, Input, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PostFileServiceService } from 'src/app/services/post-file-service.service';

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
  @Input() id!: any;
  playlist:any = {};
  requestSub = new Subscription();
  linkDue!: any;


  constructor(private gettingFile: PostFileServiceService) { }


  public playAudio() {
    console.log(this.id);
    if(!this.id){
      console.error('id del file non definito trovato');
      return;
    }
    this.requestSub = this.gettingFile.getFilebyIdJson(this.id).subscribe({
      next: (res: any) => {
        console.log(typeof(res));
        
      if(res instanceof Blob){
        this.linkDue = URL.createObjectURL(res);
        this.playlist = {
          title: this.name,
          link: this.linkDue
        }
        console.log(res+"TIPO: "+typeof(res));
        console.log("ci entra qui");
        console.log('linkDue:'+ this.linkDue);
        console.log(res.type);
        console.log('sto riproducendo:'+ this.playlist.title +' '+this.playlist.link);
        let audio = new Audio();
        audio.src = this.playlist.link;
        audio.load();
        audio.play().catch(error=>console.error('errore riproduzione audio', error));
      }else{
        console.error('errore nel caricamento del file');
      }
    }, error: (error)=>{
      console.error('errore nel caricamento del file', error)
    },
    complete: ()=>{
      console.log('download del file completato');
      }
    });
  };
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['link']&&changes['link'].currentValue){
      this.playlist.link = changes['link'].currentValue;
    }if (changes['name']&&changes['name'].currentValue) {
      this.playlist.title = changes['name'].currentValue;
    }
  }
  ngOnInit(): void {
    this.playAudio();
  }
}
