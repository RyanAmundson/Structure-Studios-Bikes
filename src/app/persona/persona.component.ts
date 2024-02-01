import { Component, Signal, WritableSignal, inject, signal } from '@angular/core';
import { UserService } from '../[services]/user.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent {

  public userService = inject(UserService)

  noImage:WritableSignal<boolean> = signal(false);

  user$ = toObservable(this.userService.loggedInUser);

  failedToLoadProfileImage() {
    this.noImage.set(true);
  }

}
