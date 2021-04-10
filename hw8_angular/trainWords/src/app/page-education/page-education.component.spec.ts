import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Route } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PageEducationComponent } from './page-education.component';
import { SettingsService } from '../services/settings.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockRoute: Route = { 
  path: 'education',      
  component: PageEducationComponent, 
  data: of({
    title: 'Обучение'
  }) 
};

describe('PageEducationComponent', () => {
  let component: PageEducationComponent;
  let fixture: ComponentFixture<PageEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEducationComponent ],
      imports: [MatDialogModule, BrowserAnimationsModule],
      providers: [
        {provide: ActivatedRoute, useValue: mockRoute},
        {provide: MatDialog},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title given from mockRoute', () => {
    expect(component.title).toBe('Обучение');
  });


  it('#calculateResult should return a ref to the dialog',() => {
    expect(component.calculateResult()).toBeInstanceOf(MatDialogRef);
  });
  
});
