import { PaginatedResult } from './../_models/pagination';
import { BookForRegister } from './../_models/bookForRegister';
import { Book } from './../_models/book';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  // This will have to be changed for specific users
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'books/');
  }

  getBook(id): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + 'books/' + id);
  }

  getUserBooks(id, page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Book[]>> {
    const paginatedResult: PaginatedResult<Book[]> = new PaginatedResult<
      Book[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('authorFilter', userParams.authorFilter);
      params = params.append('titleFilter', userParams.titleFilter);
      params = params.append('publisherFilter', userParams.publisherFilter);
    }

    return this.http
      .get<Book[]>(this.baseUrl + 'users/' + id + '/books/', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
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
