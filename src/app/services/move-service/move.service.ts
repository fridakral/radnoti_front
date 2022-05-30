import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  moveList$: Observable<boolean>;
  private moveListSubject = new Subject<boolean>();

  constructor() {
    this.moveList$ = this.moveListSubject.asObservable();
  }

  moveList(data: boolean) {
    this.moveListSubject.next(data);
  }
}
