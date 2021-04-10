import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DictionaryService } from '../services/dictionary.service';
import { SettingsService } from '../services/settings.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {

  title: string = 'new word';

  constructor(
    private service: TranslateService, 
    private dict:DictionaryService,
    private dialogRef: MatDialogRef<NewWordComponent>,
    private settings: SettingsService
  ) { }

  word: string = '';
  translation: string = '';
  errorText: string = '';
  srcLang: string = this.settings.getSettings().locale;
  destLang: string = this.settings.getDestLanguage().locale;

  ngOnInit(): void {
  }

  translateWord() {
    this.service.translate(this.word,this.srcLang,this.destLang)
      .subscribe( (data: any) => {
        this.translation = data.result
        if(this.isWordExists(this.word,'en')) {
          this.errorText = `Слово "${this.word}" уже добавлено в словарь`;
        } else {
          this.errorText = '';
        }
      });
  }

  addWord() {
    this.dict.addWord({
      word: this.word,
      translation: this.translation,
      srcLang: this.srcLang,
      destLang: this.destLang
    });
    this.dialogRef.close();
  }

  private isWordExists(word: string,lang: string):boolean {
    let dictWord = this.dict.findWord(word,lang);
    if (dictWord !== undefined) {
      return true;
    } else {
      return false;
    }
  }

}
