import { TestBed } from '@angular/core/testing';

import { DictionaryService } from './dictionary.service';

describe('DictionaryService', () => {
  let service: DictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getList should return an array', () => {
    expect(service.getList()).toBeInstanceOf(Array);
  });

  it('#addWord should add an element to the list', () => {
    const lengthBefore = service.getList().length;
    console.log(lengthBefore);
    service.addWord({
      word: 'Test',
      translation: 'Тест',
      srcLang: 'en',
      destLang: 'ru'
    });
    const lengthAfter = service.getList().length;
    console.log(lengthAfter);
    expect( (lengthAfter - lengthBefore) ).toBe(1);
  });

  it('#clean should return an empty array', () => {
    service.clean();
    const length = service.getList().length;
    expect(length).toBe(0);
  });

});
