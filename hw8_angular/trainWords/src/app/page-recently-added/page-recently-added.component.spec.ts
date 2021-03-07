import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Route } from '@angular/router';
import { of } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PageRecentlyAddedComponent } from './page-recently-added.component';
import { WordsListComponent } from '../words-list/words-list.component'; 

const mockRoute: Route = { 
  path: 'recently-added',      
  component: PageRecentlyAddedComponent, 
  data: of({
    title: 'Недавно добавленные слова'
  }) 
};

describe('PageRecentlyAddedComponent', () => {
  let component: PageRecentlyAddedComponent;
  let fixture: ComponentFixture<PageRecentlyAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRecentlyAddedComponent, WordsListComponent ],
      imports: [MatListModule, MatIconModule,MatDialogModule,BrowserAnimationsModule,HttpClientTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: mockRoute},
        {provide: MatDialog},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRecentlyAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title given from mockRoute', () => {
    expect(component.title).toBe('Недавно добавленные слова');
  });

  it('should render s button with mat-fab attribute',() => {
    let compiled: HTMLElement = fixture.nativeElement;
    
    expect(compiled.querySelectorAll('button[mat-fab').length).toBe(1);
  });


  it('#openDialog should return a ref to the dialog',() => {
    expect(component.openDialog()).toBeInstanceOf(MatDialogRef);
  });
});
