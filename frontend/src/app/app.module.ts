import * as Auth0 from 'auth0-web';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule, BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';

import { AppComponent } from './app.component';
import {FlashcardsApiService} from './flashcards/flashcards-api.service';

import {FlashcardFormComponent} from './flashcards/flashcard-form.component';
import {RouterModule, Routes} from '@angular/router';
import {FlashcardsComponent} from './flashcards/flashcards.component';
import {CallbackComponent} from './callback.component';

const appRoutes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'new-flashcard', component: FlashcardFormComponent },
  { path: '', component: FlashcardsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FlashcardFormComponent,
    FlashcardsComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  providers: [FlashcardsApiService],
  bootstrap: [AppComponent]
})

export class AppModule {
	constructor() {
	   Auth0.configure({
	    domain: 'graceapps.auth0.com',
	    audience: 'https://make-flashcards.com',
	    clientID: '4N6ejF7Ie4foHzhEeu2NS0syG9rI9qJ2',
	    redirectUri: 'http://localhost:4200/callback',
	    scope: 'openid profile manage:cards'
    });
  }
}


