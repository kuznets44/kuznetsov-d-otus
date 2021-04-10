import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Word } from '../interfaces/word';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  STORAGE_KEY: string = environment.DICTIONARY_STORAGE_KEY;

  constructor() { }

  public clean(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  public getList(): Word[] {
    let storageData = localStorage.getItem(this.STORAGE_KEY);

    if(storageData !== null) {
      return JSON.parse(storageData);
    }

    return [];
  }

  public addWord(word: Word): void {
    let list = this.getList();
    if(!word.createdAt) {
      word.createdAt = new Date().toLocaleDateString();
    }
    list.push(word);
    localStorage.setItem(this.STORAGE_KEY,JSON.stringify(list));
  }

  public getListByLang(locale: string): Word[] {
    return this.getList().filter( (item: Word) => item.srcLang == locale ? item : false);
  }

  public findWord(word: string, lang: string): Word | undefined {
    let list = this.getList();
    return list.find( (element: Word) => element.word.toLowerCase() == word.toLowerCase() && element.srcLang == lang);
  }

  public getRandomList(locale: string, amount: number): Word[] {
    const listByLang = this.getListByLang(locale);

    if(listByLang.length >= amount) {
      const randomIndices = new Array(amount).fill(0);
      randomIndices.forEach( (item,index) => {
          while(true) {
            let randomValue = Math.floor(Math.random() * listByLang.length);
            if(randomIndices.indexOf(randomValue) == -1) {
              randomIndices[index] = randomValue;
              break;
            }
          }
      })
  
      return listByLang.filter( (item,index) => randomIndices.indexOf(index) !== -1);  
    } else {
      return listByLang;
    }
  }
}
