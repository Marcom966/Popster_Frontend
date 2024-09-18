import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSuccessfullComponent } from './file-successfull.component';

describe('FileSuccessfullComponent', () => {
  let component: FileSuccessfullComponent;
  let fixture: ComponentFixture<FileSuccessfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSuccessfullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSuccessfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
