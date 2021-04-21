import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;
  constructor() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }
}
