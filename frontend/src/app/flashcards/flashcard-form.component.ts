import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FlashcardsApiService} from "./flashcards-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'flashcard-form',
  template: `
    <mat-card>
      <h2>Flashcard</h2>
        <mat-form-field class="full-width">
          <input matInput
                 placeholder="Front"
                 (keyup)="updateTitle($event)">
        </mat-form-field>

        <mat-form-field class="full-width">
          <textarea rows="5"
                    matInput
                    placeholder="Back"
                    (keyup)="updateDescription($event)"></textarea>
        </mat-form-field>

        <button mat-raised-button
                color="primary"
                (click)="saveFlashcard()">
          Save Flashcard
        </button>
    </mat-card>
  `,
  styles: [`
    .flashcards-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .full-width {
      width: 100%;
    }
  `]
})

export class FlashcardFormComponent {
  flashcard = {
    title: '',
    description: '',
  };

  constructor(private flashcardsApi: FlashcardsApiService, private router: Router) { }

  updateTitle(event: any) {
    this.flashcard.title = event.target.value;
  }

  updateDescription(event: any) {
    this.flashcard.description = event.target.value;
  }

  saveFlashcard() {
    this.flashcardsApi
      .saveFlashcard(this.flashcard)
      .subscribe(
        () => this.router.navigate(['/']),
        error => alert(error.message)
      );
  }
}