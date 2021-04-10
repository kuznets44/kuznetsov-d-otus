import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Settings } from './../interfaces/settings';

import { SettingsService } from './settings.service';

const settingsMock: Settings = {
  locale: 'de_DE',
  wordsAmount: 10
};


describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return STORAGE_KEY prop as it is specified in the environment class',() => {
    let envStorageKey: string = environment.SETTINGS_STORAGE_KEY;
    expect(service.STORAGE_KEY).toBe(envStorageKey);
  });

  it('#clean should delete localStorage node with specified key ',() => {
    service.clean();
    expect(localStorage.getItem(service.STORAGE_KEY)).toBeNull();
  });

  it('#getSettings by default should return Settings object as it specified in the env file',() => {
    service.clean();
    let settingsDefault: Settings = environment.settingsDefault;
    expect(service.getSettings()).toEqual(settingsDefault);
  });

  it('#getSrcLanguages should return array of Language specified in the env ',() => {
    let envLanguages = environment.srcLanguages;
    expect(service.getSrcLanguages()).toEqual(envLanguages);
  });

  it('#getDestLanguages should return language specified in the env ',() => {
    let envDestLanguage = environment.destLanguage;
    expect(service.getDestLanguage()).toEqual(envDestLanguage);
  });

  it('#updateSettings should write settings to the localStorage ',() => {
    service.updateSettings(settingsMock);
    expect(JSON.parse(localStorage.getItem(service.STORAGE_KEY))).toEqual(settingsMock);
  });

  it('#getSettings should return object to be equal to settingsMock ',() => {
    service.clean();
    service.updateSettings(settingsMock);
    expect(service.getSettings()).toEqual(settingsMock);
  });

});
