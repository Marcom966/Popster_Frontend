import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailComponentComponent } from './card-detail-component.component';

describe('CardDetailComponentComponent', () => {
  let component: CardDetailComponentComponent;
  let fixture: ComponentFixture<CardDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
