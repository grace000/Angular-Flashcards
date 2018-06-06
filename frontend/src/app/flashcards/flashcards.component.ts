import * as Auth0 from 'auth0-web';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Flashcard} from './flashcard.model';
import {FlashcardsApiService} from './flashcards-api.service';

@Component({
  selector: 'flashcards',
  template: `
    <h2>Flashcards</h2>
    <p>Choose a flashcard deck and start studying.</p>
    <div class="flashcards">
      <mat-card class="example-card" *ngFor="let flashcard of flashcardsList" class="mat-elevation-z5">
        <mat-card-content>
          <mat-card-title>{{flashcard.title}}</mat-card-title>
          <mat-card-subtitle>{{flashcard.description}}</mat-card-subtitle>
          <p>
            Etiam enim purus, vehicula nec dapibus quis, egestas eu quam.
            Nullam eleifend auctor leo, vitae rhoncus mi sodales vel.
            Aenean fermentum laoreet volutpat. Integer quam orci,
            molestie non nibh suscipit, faucibus euismod sapien.
          </p>
          <button mat-raised-button color="accent">Start Deck</button>
           <button mat-button color="warn" *ngIf="isAdmin()"
                  (click)="delete(flashcard.id)">
            Delete
          </button>
        </mat-card-content>
      </mat-card>
    </div>
    <button mat-fab color="primary" *ngIf="authenticated"
            class="new-flashcard" routerLink="/new-flashcard">
      <i class="material-icons">note_add</i>
    </button>
  `,
  styleUrls: ['flashcards.component.css'],
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

   delete(flashcardId: number) {
    this.flashcardsApi
      .deleteFlashcard(flashcardId)
      .subscribe(() => {
        this.flashcardsListSubs = this.flashcardsApi
          .getFlashcards()
          .subscribe(res => {
              this.flashcardsList = res;
            },
            console.error
          )
      }, console.error);
  }

  isAdmin() {
    if (!Auth0.isAuthenticated()) return false;

    const roles = Auth0.getProfile()['https://flashcards.co/roles'];
    return roles.includes('admin');
  }
}