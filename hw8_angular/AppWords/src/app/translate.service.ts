import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  SERVICE_URL:string = 'https://api-b2b.backenster.com/b1/api/v3/translate';
  API_KEY: string = 'a_nw4HbDHvCUNRQgkvk2i04FHF2VK6WumJaAvOlRNA5CPfKODybG5hKgGiZqvtFfcLbiO16nQkJMzB4uRW';

  constructor( private http: HttpClient) { 

  }

  public translate( wordToTranslate: string, langSrc: string, langDest: string): Observable<Object> {

    return this.http.post(this.SERVICE_URL,JSON.stringify({
      "from": langSrc,
      "to": langDest,
      "data": wordToTranslate,
      "platform": "api"
    }),{
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.API_KEY,
        "Accept": "application/json"
      }
    });
  }
}
