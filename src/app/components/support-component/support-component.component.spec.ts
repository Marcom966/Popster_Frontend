import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportComponentComponent } from './support-component.component';

describe('SupportComponentComponent', () => {
  let component: SupportComponentComponent;
  let fixture: ComponentFixture<SupportComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
