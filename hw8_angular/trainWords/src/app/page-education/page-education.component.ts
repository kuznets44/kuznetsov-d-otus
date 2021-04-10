import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EducationResultComponent } from '../education-result/education-result.component';
import { Word } from '../interfaces/word';
import { WordToTranslate } from '../interfaces/words-to-translate';
import { DictionaryService } from '../services/dictionary.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-page-education',
  templateUrl: './page-education.component.html',
  styleUrls: ['./page-education.component.css']
})
export class PageEducationComponent implements OnInit {

  title: string = 'Education';
  wordsToTranslate: WordToTranslate[] = [];
  srcLang: string = this.settings.getSettings().locale;
  wordsAmount: number = this.settings.getSettings().wordsAmount;

  constructor(
    private route: ActivatedRoute,
    private dict: DictionaryService,
    public dialog: MatDialog,
    private settings: SettingsService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => this.title = data.title);
    
    let randomWords: Word[] = this.dict.getRandomList(this.srcLang,this.wordsAmount);
    randomWords.forEach( (item) => {
      this.wordsToTranslate.push({
        word: item.word,
        translation: item.translation,
        formGroup: new FormGroup({
          ctrlTranslation: new FormControl(''),
        })
      });
    });
  }

  calculateResult():MatDialogRef<EducationResultComponent> {
    return this.dialog.open(EducationResultComponent,{
      width: '640px',
      data: {
        result:this.wordsToTranslate
      }
    });
  }
}
