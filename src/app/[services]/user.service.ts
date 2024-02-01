import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {

  public auth:Auth = inject(Auth);

  loggedInUser: WritableSignal<any> = signal(this.auth.currentUser);

  constructor() { 
    this.auth.authStateReady().then(() => this.loggedInUser.set(this.auth.currentUser));
  }

  
}