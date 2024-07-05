import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadErrorComponent } from './file-upload-error.component';

describe('FileUploadErrorComponent', () => {
  let component: FileUploadErrorComponent;
  let fixture: ComponentFixture<FileUploadErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
