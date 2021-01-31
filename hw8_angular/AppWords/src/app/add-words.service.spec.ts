import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AddWordsService } from './add-words.service';

describe('AddWordsService', () => {
  let service: AddWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AddWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
