import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleLandingPageComponent } from './google-landing-page.component';

describe('GoogleLandingPageComponent', () => {
  let component: GoogleLandingPageComponent;
  let fixture: ComponentFixture<GoogleLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
