import { Injectable } from '@angular/core';
import { Word } from './word';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  STORAGE_KEY: string = 'appWord';

  constructor( ) { }

  public getList(): Object[] {
    let storageData = localStorage.getItem(this.STORAGE_KEY);

    if(storageData !== null) {
      return JSON.parse(storageData);
    }

    return [];
  }

  public addWord(word: Word): void {
    let list = this.getList();
    list.push(word);
    localStorage.setItem(this.STORAGE_KEY,JSON.stringify(list));
  }

  public clean(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

}
