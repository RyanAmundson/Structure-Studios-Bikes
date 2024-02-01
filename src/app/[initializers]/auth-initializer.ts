
import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { Auth } from '@angular/fire/auth';

function initialize(auth: Auth) {
  return auth.authStateReady();
}

function authInitializerFactory(auth: Auth) {
  return () => initialize(auth);
}

export const AuthInitializer: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializerFactory,
  deps: [Auth],
  multi: true
};
