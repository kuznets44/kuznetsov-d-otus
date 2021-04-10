import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DictionaryService } from './dictionary.service';
import { TranslateService } from './translate.service';

@Injectable({
  providedIn: 'root'
})
export class AddWordsService {

  constructor( 
    private translateService: TranslateService,
    private dictService: DictionaryService
  ) { }

  public addText( text: string, srcLang: string, destLang: string): void {
    let words = text.split(' ');

    words.forEach(word => {
      this.translateService.translate(word,'en_US','ru_RU').subscribe( (data:any) => {
        this.dictService.addWord({
          word: data.source,
          translation: data.result,
          srcLang: srcLang,
          destLang: destLang
        });
      });
    });
  }
}
