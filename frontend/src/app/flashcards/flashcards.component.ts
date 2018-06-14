import * as Auth0 from 'auth0-web';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {Subscription} from 'rxjs/Subscription';
import {Flashcard} from './flashcard.model';
import {FlashcardsApiService} from './flashcards-api.service';

@Component({
  selector: 'flashcards',
  template: `
    <h2>Flashcards</h2>
    <p>Start studying! Sign in to create new cards!</p>
    <div class="flashcards">
      
      <mat-card class="example-card" *ngFor="let flashcard of flashcardsList; let i=index" class="mat-elevation-z5 tp-box"
        (click)="flip(i)" [@flipState]="flashcard.isFlipped">   
        <mat-card-content>
          <div class="tp-box__side tp-box__front">
            <mat-card-title>{{flashcard.title}}</mat-card-title>
            <button mat-raised-button color="accent">Flip</button>
             <button mat-button color="warn" *ngIf="isAdmin()"
                    (click)="delete(flashcard.id)">
              Delete
            </button>
          </div>
          
          <div class="tp-box__side tp-box__back">
            <p>{{flashcard.description}}</p>
          </div> 
        </mat-card-content>
      </mat-card>

    </div>


    <button mat-fab color="primary" *ngIf="authenticated"
            class="new-flashcard" routerLink="/new-flashcard">
      <i class="material-icons">note_add</i>
    </button>
  `,
  styleUrls: ['flashcards.component.css'],

  animations: [
    trigger('flipState', [
      state('true', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('false', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])  
  ]
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

  flip(index) {
    this.flashcardsList[index].isFlipped = !this.flashcardsList[index].isFlipped;
  }

  // flip: string = 'inactive';
  // toggleFlip() {
  //   this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  // }

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

    const roles = Auth0.getProfile()['https://make-flashcards.com/roles'];
    return roles.includes('admin');
  }
}