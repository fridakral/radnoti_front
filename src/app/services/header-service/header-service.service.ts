import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderServiceService {
  _isLoggedIn: boolean = false;

  _isLoggedInSource: Subject<boolean> = new Subject();
  _isLoggedInUserSource: Subject<string> = new Subject();
  _onMainPageSource: Subject<boolean> = new Subject();

  get isLoggedInSource(): Subject<boolean> {
    return this._isLoggedInSource;
  }

  set isLoggedInSource(src: Subject<boolean>) {
    this._isLoggedInSource = src;
  }

  get isLoggedInUserSource(): Subject<string> {
    return this._isLoggedInUserSource;
  }

  set isLoggedInUserSource(src: Subject<string>) {
    this._isLoggedInUserSource = src;
  }

  get onMainPageSource(): Subject<boolean> {
    return this._onMainPageSource;
  }

  set onMainPageSource(src: Subject<boolean>) {
    this._onMainPageSource = src;
  }

  constructor() {}

  changeIsLoggedIn(n: boolean) {
    this.isLoggedInSource.next(n);
  }

  changeIsLoggedInUser(n: string) {
    this.isLoggedInUserSource.next(n);
  }

  changeOnMainPage(n: boolean) {
    this.onMainPageSource.next(n);
  }
}
