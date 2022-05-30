import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public _opened = false;
  private sideNavSubject = new Subject<SideNavState>();
  sideNavState = this.sideNavSubject.asObservable();

  constructor() {}

  _show() {
    this.sideNavSubject.next(<SideNavState>{ _opened: true });
  }

  _hide() {
    this.sideNavSubject.next(<SideNavState>{ _opened: false });
  }
}

export interface SideNavState {
  _opened: boolean;
}
