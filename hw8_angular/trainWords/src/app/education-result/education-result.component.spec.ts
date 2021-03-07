import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';


import { EducationResultComponent } from './education-result.component';

describe('EducationResultComponent', () => {
  let component: EducationResultComponent;
  let fixture: ComponentFixture<EducationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationResultComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      imports: [MatTableModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
