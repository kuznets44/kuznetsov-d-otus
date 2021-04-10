// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Settings } from './../app/interfaces/settings';
import { Language } from './../app/interfaces/language';

const settingsDefault: Settings = {
  locale: 'en_GB',
  wordsAmount: 5
};

const srcLanguages: Language[] = [
  {locale: 'en_GB', name: 'Английский'},
  {locale: 'de_DE', name: 'Немецкий'}
];

const destLanguage: Language = {
  locale: 'ru_RU', name: 'Русский'
};


export const environment = {
  production: false,
  SETTINGS_STORAGE_KEY: 'trainWordsSettings',
  DICTIONARY_STORAGE_KEY: 'trainWordsDictionary',
  TRANSLATION_SERVICE_URL: 'https://api-b2b.backenster.com/b1/api/v3/translate',
  TRANSLATION_API_KEY: 'a_nw4HbDHvCUNRQgkvk2i04FHF2VK6WumJaAvOlRNA5CPfKODybG5hKgGiZqvtFfcLbiO16nQkJMzB4uRW',
  settingsDefault,
  srcLanguages,
  destLanguage
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
