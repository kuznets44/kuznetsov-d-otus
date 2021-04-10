import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Route } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { of } from 'rxjs';

import { PageSettingsComponent } from './page-settings.component';
import { SettingsFormComponent } from '../settings-form/settings-form.component';

describe('PageSettingsComponent', () => {
  let component: PageSettingsComponent;
  let fixture: ComponentFixture<PageSettingsComponent>;

  const mockRoute: Route = { 
    path: 'settings',      
    component: PageSettingsComponent, 
    data: of({
      title: 'Настройки'
    }) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSettingsComponent, SettingsFormComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: mockRoute}
      ],
      imports: [
        MatSelectModule, 
        MatFormFieldModule, 
        MatInputModule, 
        BrowserAnimationsModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title given from mockRoute', () => {
    expect(component.title).toBe('Настройки');
  });
});

