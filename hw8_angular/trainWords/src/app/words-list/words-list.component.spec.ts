import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Word } from '../interfaces/word';
import { DictionaryService } from '../services/dictionary.service';
import { MatListModule } from '@angular/material/list';

import { WordsListComponent } from './words-list.component';

const wordsMock: Word[] = [
  {
    srcLang: 'en_GB',
    destLang: 'ru_RU',
    word: 'peace',
    translation: 'мир',
  },
  {
    srcLang: 'de_DE',
    destLang: 'ru_RU',
    word: 'tag',
    translation: 'день',
  },
  {
    srcLang: 'en_GB',
    destLang: 'ru_RU',
    word: 'cat',
    translation: 'кот',
    createdAt: new Date(2020,1,1).toLocaleDateString()
  },
];

describe('WordsListComponent', () => {
  let component: WordsListComponent;
  let fixture: ComponentFixture<WordsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordsListComponent ],
      imports: [MatListModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "mat-list" element', () => {
    let compiled: HTMLElement = fixture.nativeElement;

    expect(compiled.querySelectorAll('mat-list').length).toBe(1);
  });


});
