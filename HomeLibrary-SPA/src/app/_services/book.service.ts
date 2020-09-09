import { BookForRegister } from './../_models/bookForRegister';
import { Book } from './../_models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl = environment.apiUrl;
  books: BookForRegister[];

  constructor(private http: HttpClient) {
    // this.addBooksToTest();
  }

  // This will have to be changed for specific users
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'books/');
  }

  getBook(id): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + 'books/' + id);
  }

  getUserBooks(id): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'users/' + id + '/books/');
  }

  getSearchResults(searchFormValues) {
    return this.http
      .post<any>(this.baseUrl + 'books/search', searchFormValues)
      .pipe(
        map((response: any) => {
          const books = response;
          if (books) {
            this.books = books;
          }
        })
      );
  }
}
