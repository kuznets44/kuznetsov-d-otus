import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRecentlyAddedComponent } from './page-recently-added.component';

describe('PageRecentlyAddedComponent', () => {
  let component: PageRecentlyAddedComponent;
  let fixture: ComponentFixture<PageRecentlyAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRecentlyAddedComponent ]
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
});
