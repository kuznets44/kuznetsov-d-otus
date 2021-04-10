import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  SERVICE_URL: string = environment.TRANSLATION_SERVICE_URL;
  API_KEY: string = environment.TRANSLATION_API_KEY;


  constructor( private http: HttpClient ) { }

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
