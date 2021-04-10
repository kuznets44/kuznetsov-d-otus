import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language } from '../interfaces/language';
import { Settings } from '../interfaces/settings';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  STORAGE_KEY = environment.SETTINGS_STORAGE_KEY;

  public getSettings(): Settings {

    let result: Settings = environment.settingsDefault;

    let storageData = localStorage.getItem(this.STORAGE_KEY);

    if(storageData !== null) {
      result = JSON.parse(storageData);
    }
  
    return result;
  }

  public clean(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  public getSrcLanguages(): Language[] {
    return environment.srcLanguages;
  }

  public getDestLanguage(): Language {
    return environment.destLanguage;
  }

  public updateSettings(val: Settings): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(val));
  }

  constructor() { }
}
