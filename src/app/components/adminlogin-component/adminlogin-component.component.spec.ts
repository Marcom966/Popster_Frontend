import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminloginComponentComponent } from './adminlogin-component.component';

describe('AdminloginComponentComponent', () => {
  let component: AdminloginComponentComponent;
  let fixture: ComponentFixture<AdminloginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminloginComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminloginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
