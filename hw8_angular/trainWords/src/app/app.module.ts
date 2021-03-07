import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';


import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';


import { PageRecentlyAddedComponent } from './page-recently-added/page-recently-added.component';
import { PageEducationComponent } from './page-education/page-education.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { WordsListComponent } from './words-list/words-list.component';
import { NewWordComponent } from './new-word/new-word.component';
import { EducationResultComponent } from './education-result/education-result.component';


const appRoutes: Routes = [
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


@NgModule({
  declarations: [
    AppComponent,
    PageRecentlyAddedComponent,
    PageEducationComponent,
    PageSettingsComponent,
    PageNotFoundComponent,
    WordsListComponent,
    SettingsFormComponent,
    NewWordComponent,
    EducationResultComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    MatStepperModule,
    MatTableModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
