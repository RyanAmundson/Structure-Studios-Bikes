import { ApplicationInitStatus, Component, inject } from '@angular/core';
import { UserService } from './[services]/user.service';
import { lastValueFrom } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { HeaderService } from './[services]/header.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private user: UserService = inject(UserService);
  public headerService = inject(HeaderService);
  private auth: Auth = inject(Auth);
  private appInitStatus: ApplicationInitStatus = inject(ApplicationInitStatus);
  appReady = Promise.all([this.appInitStatus.donePromise]).then(() => true);
}
