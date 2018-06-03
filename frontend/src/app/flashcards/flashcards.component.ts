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