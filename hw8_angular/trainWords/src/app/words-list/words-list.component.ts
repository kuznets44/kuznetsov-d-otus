import { Component, OnInit } from '@angular/core';
import { Word } from '../interfaces/word';
import { WordsByDate } from '../interfaces/words-by-date';
import { DictionaryService } from '../services/dictionary.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {

  get wordsByDates(): WordsByDate[] {
    const srcLang: string = this.settings.getSettings().locale;
    const wordsList = this.dict.getListByLang(srcLang).reverse();

    const wordsByDates: WordsByDate[] = [];
    let currentDate:string = '';
    let currentIndex = -1;
    wordsList.forEach( (item: Word) => {
      let dateStr: string = item.createdAt ? item.createdAt : '';
      if(dateStr !== currentDate) {
        currentDate = dateStr;
        wordsByDates.push({
          date: dateStr!,
          words: []
        });
        currentIndex++;
      }
      wordsByDates[currentIndex].words.push(item);
    });

    return wordsByDates;
  }

  constructor( private settings: SettingsService, private dict: DictionaryService ) { }

  ngOnInit(): void {
  }

}
