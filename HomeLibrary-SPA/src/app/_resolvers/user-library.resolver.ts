import { catchError } from 'rxjs/operators';
import { AlertifyService } from './../_services/alertify.service';
import { BookService } from './../_services/book.service';
import { Book } from './../_models/book';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { of, Observable } from 'rxjs';

@Injectable()
export class UserLibraryResolver implements Resolve<Book[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(
    private bookService: BookService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Book[]> {
    return this.bookService
      .getUserBooks(route.params['id'], this.pageNumber, this.pageSize)
      .pipe(
        catchError((error) => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
