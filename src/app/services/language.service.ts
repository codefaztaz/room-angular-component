import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, interval, merge, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core'; 

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _language: BehaviorSubject<string>;
  
  constructor (
    private readonly NgxTranslateService: TranslateService
  ) {
    this._language = new BehaviorSubject("en"); // Default language
    NgxTranslateService.use("en");
  }

  set languageSelected(value: string) {
    this._language.next(value);
    this.NgxTranslateService.use(value);
    console.log(this._language);
  }

  public getLanguage$(): Observable<string> {
    return this._language.asObservable();
    
  }

  public getCurrentLanguage(): string {
    return this._language.getValue();
  }
}
