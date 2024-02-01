import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IsLoggedIn } from './[guards]/auth.guard';
import { HeaderComponent } from './header/header.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { HttpClientModule } from '@angular/common/http';
import { MasonryTileComponent } from './[components]/masonry-tile/masonry-tile.component';
import { MasonryComponent } from './[components]/masonry/masonry.component';
import { PersonaComponent } from './persona/persona.component';
import { FiltersComponent } from './[components]/filters/filters.component';
import { MatChipsModule } from '@angular/material/chips';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { BikeTileFrontComponent } from './[components]/bike-tile/bike-tile-front/bike-tile-front.component';
import { BikeTileBackComponent } from './[components]/bike-tile/bike-tile-back/bike-tile-back.component';
import { AuthInitializer } from './[initializers]/auth-initializer';
import { AdminComponent } from './admin/admin.component';
import { AddBikeFormComponent } from './[components]/add-bike-form/add-bike-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { BikeTileComponent } from './[components]/bike-tile/bike-tile.component';
import { BikeTileActionBarComponent } from './[components]/bike-tile/bike-tile-action-bar/bike-tile-action-bar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    CallbackComponent,
    MasonryTileComponent,
    MasonryComponent,
    PersonaComponent,
    FiltersComponent,
    ErrorPageComponent,
    BikeTileComponent,
    BikeTileFrontComponent,
    BikeTileBackComponent,
    AdminComponent,
    AddBikeFormComponent,
    BikeTileActionBarComponent,

  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatChipsModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthInitializer,
    IsLoggedIn,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
