import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Language } from './interfaces/language';
import { SettingsService } from './services/settings.service';
import { RouterTestingModule } from '@angular/router/testing';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { Routes } from '@angular/router';
import { PageEducationComponent } from './page-education/page-education.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageRecentlyAddedComponent } from './page-recently-added/page-recently-added.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';

const languageMock: Language = {
  locale: 'en_GB',
  name: 'Английский'
};

const routesMock: Routes = [
  { path: 'recently-added', component: PageRecentlyAddedComponent, data: {
    title: 'Недавно добавленные слова',
  } },
  { path: 'education',      component: PageEducationComponent, data: {
    title: 'Обучение'
  } },
  { path: 'settings',      component: PageSettingsComponent, data: {
    title: 'Настройки'
  } },
  { path: '',   redirectTo: '/recently-added', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatToolbarModule,
        MatSidenavModule,
        MatTabsModule,
        RouterTestingModule.withRoutes(routesMock)
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'trainWords'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('TrainWords');
  });

  it(`should have as langSelected object equal to languageMock variable`, () => {

    const settings = new SettingsService();
    settings.clean();
    settings.updateSettings({
      locale:languageMock.locale,
      wordsAmount: 10
    });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.langSelected).toEqual(languageMock);
  });
  
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-toolbar span').textContent).toContain(`${app.title}: ${app.langSelected.name}`);
  });

  it('links property should contain an array of 3 elements corresponding mockRoute object links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    expect(app.links.length).toBe(3);
  });

  it('should render navigation links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('nav a').length).toBe(3);
  });

  it('should render router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
  
});
