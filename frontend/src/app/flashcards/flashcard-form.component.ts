import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FlashcardsApiService} from "./flashcards-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'flashcard-form',
  template: `
    <div>
      <h2>New Flashcard</h2>
      <label for="flashcard-title">Title</label>
      <input id="flashcard-title" (keyup)="updateTitle($event)">
      <label for="flashcard-description">Description</label>
      <input id="flashcard-description" (keyup)="updateDescription($event)">
      <button (click)="saveFlashcard()">Save Flashcard</button>
    </div>
  `
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