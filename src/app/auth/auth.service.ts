
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, lastValueFrom, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private auth: Auth = inject(Auth);

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();

  public lastLoginEvent = signal(null);



  logout() {
    this.auth.signOut();
  }

}