import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Language } from '../interfaces/language';
import { SettingsService } from '../services/settings.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.css']
})
export class SettingsFormComponent implements OnInit {

  languages: Language[] = this.settings.getSrcLanguages();
  wordsAmount: FormControl = new FormControl(this.settings.getSettings().wordsAmount,[
    Validators.required,
    Validators.min(2)
  ]);
  localeSelected: FormControl = new FormControl(this.settings.getSettings().locale); 

  updateSettings() {
    if(!this.wordsAmount.errors) {
      this.settings.updateSettings({
        locale: this.localeSelected.value,
        wordsAmount: this.wordsAmount.value
      });
      this.snackBar.open('Настройки сохранены!','',{
        duration: 2000
      });  
    } else {
      this.snackBar.openFromComponent(SettingsErrorComponent,{
        duration: 2000
      }); 
    }
  }

  constructor( private settings: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

}


@Component({
  template: '<div style="color:red">Ошибка!<br> Количество слов должно быть больше 2!</div>'
})
export class SettingsErrorComponent {}