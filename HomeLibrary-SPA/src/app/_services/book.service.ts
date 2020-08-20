import { Book } from './../_models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  // This will have to be changed for specific users
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'books/');
  }

  getBook(id): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + 'books/' + id);
  }

}
