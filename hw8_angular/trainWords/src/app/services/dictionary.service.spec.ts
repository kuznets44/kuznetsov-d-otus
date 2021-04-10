import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Word } from '../interfaces/word';
import { DictionaryService } from './dictionary.service';


const wordMock: Word = {
  srcLang: 'en_GB',
  destLang: 'ru_RU',
  word: 'peace',
  translation: 'мир'
};

const wordsMock: Word[] = [
  {
    srcLang: 'en_GB',
    destLang: 'ru_RU',
    word: 'peace',
    translation: 'мир'
  },
  {
    srcLang: 'en_GB',
    destLang: 'ru_RU',
    word: 'cat',
    translation: 'кот'
  },
  {
    srcLang: 'de_DE',
    destLang: 'ru_RU',
    word: 'tag',
    translation: 'день'
  }
];

describe('DictionaryService', () => {
  let service: DictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return STORAGE_KEY prop as it is specified in the environment class',() => {
    let envStorageKey: string = environment.DICTIONARY_STORAGE_KEY;
    expect(service.STORAGE_KEY).toBe(envStorageKey);
  });

  it('#clean should delete localStorage node with specified key ',() => {
    service.clean();
    expect(localStorage.getItem(service.STORAGE_KEY)).toBeNull();
  });

  it('#getList by default should return an empty array ',() => {
    service.clean();
    expect(service.getList().length).toBe(0);
  });

  it('#addWord should increase add a word to the dictionary ',() => {
    service.clean();
    service.addWord(wordMock);

    let lastWord = service.getList().pop();
    expect(lastWord).toEqual(wordMock);
  });

  it('#getListByLang should return words filtered by srcLang field ',() => {
    service.clean();

    wordsMock.forEach( item => service.addWord(item));

    expect(service.getListByLang('en_GB').length).toBe(2);
  });

  it('#findWord should return first word in wordsMock ',() => {
    service.clean();

    wordsMock.forEach( item => service.addWord(item));

    expect(service.findWord('cat','en_GB').word).toEqual('cat');
  });

  it('#getRandomList should return list of 1 element ',() => {
    service.clean();

    wordsMock.forEach( item => service.addWord(item));

    expect(service.getRandomList('en_GB',1).length).toBe(1);
  });
});
