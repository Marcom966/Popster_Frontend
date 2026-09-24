import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcomponenmtComponent } from './searchcomponenmt.component';

describe('SearchcomponenmtComponent', () => {
  let component: SearchcomponenmtComponent;
  let fixture: ComponentFixture<SearchcomponenmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchcomponenmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchcomponenmtComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
