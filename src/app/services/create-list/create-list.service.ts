import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateListService {
  myMethod$: Observable<string>;
  private myMethodSubject = new Subject<string>();

  constructor() {
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  myMethod(data: string) {
    this.myMethodSubject.next(data);
  }
}
