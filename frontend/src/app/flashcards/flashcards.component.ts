import * as Auth0 from 'auth0-web';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Flashcard} from './flashcard.model';
import {FlashcardsApiService} from './flashcards-api.service';

@Component({
  selector: 'flashcards',
  template: `
    <div>
      <button routerLink="/new-flashcard">New Flashcard</button>
      <button (click)="signIn()" *ngIf="!authenticated">Sign In</button>
      <button (click)="signOut()" *ngIf="authenticated">Sign Out</button>
      <p *ngIf="authenticated">Hello, {{getProfile().name}}</p>
      <ul>
        <li *ngFor="let flashcard of flashcardsList">
          {{flashcard.title}}
        </li>
      </ul>
    </div>
  `
})

export class FlashcardsComponent implements OnInit, OnDestroy {
  flashcardsListSubs: Subscription;
  flashcardsList: Flashcard[];
  authenticated = false;

  constructor(private flashcardsApi: FlashcardsApiService) { }

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;
  getProfile = Auth0.getProfile;


  ngOnInit() {
    this.flashcardsListSubs = this.flashcardsApi
      .getFlashcards()
      .subscribe(res => {
          this.flashcardsList = res;
        },
        console.error
      );
      const self = this;
      Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }

  ngOnDestroy() {
    this.flashcardsListSubs.unsubscribe();
  }
}