
import { Component, Inject, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Auth, GoogleAuthProvider, authState, signInWithPopup } from '@angular/fire/auth';
import { getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { UserService } from '../[services]/user.service';
import { Router } from '@angular/router';

export enum LoginState {
  LoggedIn,
  LoggedOut,
  LoggingIn,
  ErrorWhileLoggingIn
}

export enum LoginEvent {
  LoginStarted,
  LoginCompleted,
  LoginFailed,
  LogoutStarted,
  LogoutCompleted,
}


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  LoginState = LoginState;

  private auth: Auth = inject(Auth);
  private router = inject(Router);
  public user: UserService = inject(UserService);

  status: Signal<LoginState> = computed(() => {
    const user = this.user.loggedInUser();

    if (user) return LoginState.LoggedIn;
    return LoginState.LoggedOut;
  });


  continue(): void {
    this.router.navigate(['/home']).catch((err: any) => console.error("Failed to navigate: ", err));
  }

  goToAdmin() {
    this.router.navigate(['/admin']).catch((err: any) => console.error("Failed to navigate: ", err));
  }

  public async login(auth = this.auth): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const result = await signInWithPopup(this.auth, provider);

    this.user.loggedInUser.set(result.user ?? null);
    // get token here if necessary
  }


  logout(): void {
    this.auth.signOut().then(() => {
      this.user.loggedInUser.set(null);
    });
  }

}