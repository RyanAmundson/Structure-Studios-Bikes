import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable, map } from 'rxjs';
import { UserService } from '../[services]/user.service';


@Injectable()
export class IsLoggedIn implements CanActivate {

  user: UserService = inject(UserService);
  public router: Router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user.loggedInUser() !== null ? true : this.router.parseUrl('login');
  }

}