import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { PageRecentlyAddedComponent } from './page-recently-added/page-recently-added.component';
import { WordsListComponent } from './words-list/words-list.component';
import { NewWordComponent } from './new-word/new-word.component';
import { PageEducationComponent } from './page-education/page-education.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { EducationComponent } from './education/education.component';
import { SettingsFormComponent } from './settings-form/settings-form.component';

import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    PageRecentlyAddedComponent,
    WordsListComponent,
    NewWordComponent,
    PageEducationComponent,
    PageSettingsComponent,
    EducationComponent,
    SettingsFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
