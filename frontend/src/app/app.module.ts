import * as Auth0 from 'auth0-web';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatButtonModule, MatCardModule} from '@angular/material';

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
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [FlashcardsApiService],
  bootstrap: [AppComponent]
})

export class AppModule {
	constructor() {
	   Auth0.configure({
	    domain: 'graceapps.auth0.com',
	    audience: 'https://flashcards.co',
	    clientID: '6u6eO3ZeEFZG5x1L4beZKZQ4trt33YWn',
	    redirectUri: 'http://localhost:4200/callback',
	    scope: 'openid profile manage:flashcards'
    });
  }
}


