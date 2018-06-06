import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {API_URL} from '../env';
import {Flashcard} from './flashcard.model';
import * as Auth0 from 'auth0-web';


@Injectable()
export class FlashcardsApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
//   getFlashcards(): Observable<any> {
//     return this.http
//       .get(`${API_URL}/flashcards`)
//       .catch(FlashcardsApiService._handleError);
//   }
// }

 getFlashcards(): Observable<Flashcard[]>{
    return this.http
      .get<Flashcard[]>(`${API_URL}/flashcards`)
      .catch(FlashcardsApiService._handleError);
  }

  saveFlashcard(flashcard: Flashcard): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http
      .post(`${API_URL}/flashcards`, flashcard, httpOptions);
  }

  deleteFlashcard(flashcardId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http
      .delete(`${API_URL}/flashcards/${flashcardId}`, httpOptions);
  }
}
