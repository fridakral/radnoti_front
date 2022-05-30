import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenService {
  constructor() {}

  ngOnInit(): void {
    let token = sessionStorage.getItem('Token');
  }

  public saveJwtToken(token: string): void {
    sessionStorage.setItem('Token', token);
  }

  public get getJwtToken(): string {
    if (sessionStorage.getItem('Token') == null) {
      return '';
    } else {
      return sessionStorage.getItem('Token') as string;
    }
  }
}
