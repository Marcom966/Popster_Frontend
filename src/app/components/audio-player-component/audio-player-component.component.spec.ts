import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerComponentComponent } from './audio-player-component.component';

describe('AudioPlayerComponentComponent', () => {
  let component: AudioPlayerComponentComponent;
  let fixture: ComponentFixture<AudioPlayerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioPlayerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioPlayerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
