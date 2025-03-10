import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAudioPlayerComponentComponent } from './ngx-audio-player-component.component';

describe('NgxAudioPlayerComponentComponent', () => {
  let component: NgxAudioPlayerComponentComponent;
  let fixture: ComponentFixture<NgxAudioPlayerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxAudioPlayerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxAudioPlayerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
