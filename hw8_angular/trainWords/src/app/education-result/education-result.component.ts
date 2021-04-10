import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EducationResult } from '../interfaces/education-result';
import { WordToTranslate } from '../interfaces/words-to-translate';

@Component({
  selector: 'app-education-result',
  templateUrl: './education-result.component.html',
  styleUrls: ['./education-result.component.css']
})
export class EducationResultComponent implements OnInit {

  resultTable: EducationResult[] = [];
  correctPercent: number = 0;
  displayedColumns: string[] = ['position','word', 'resultTranslation','result','translation'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {result: WordToTranslate[]}
  ) { }

  ngOnInit(): void {
    
    if(this.data.result) {
      this.data.result.forEach( (item,index) => this.resultTable.push({
        word: item.word,
        translation: item.translation,
        resultTranslation: item.formGroup.value.ctrlTranslation,
        position: index + 1,
        result: item.formGroup.value.ctrlTranslation == item.translation ? true : false
      }));
  
      if(this.resultTable.length > 0) {
        this.correctPercent = Math.round( 100 * this.resultTable.filter( item => item.result == true).length / this.resultTable.length );
      }  
    }
  }

  reload(): void {
    window.location.reload();
  }

}
