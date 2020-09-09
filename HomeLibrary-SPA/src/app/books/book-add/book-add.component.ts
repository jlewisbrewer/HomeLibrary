import { Router } from '@angular/router';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { BookService } from './../../_services/book.service';
import { BookForRegister } from './../../_models/bookForRegister';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
})
export class BookAddComponent implements OnInit {
  books: BookForRegister[];
  selectedBook: BookForRegister;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.books = this.bookService.books;
  }

  selectBook(book: BookForRegister) {
    console.log(this.authService.decodedToken.nameid);
    this.selectedBook = book;
    // tslint:disable-next-line: max-line-length
    this.alertify.confirm(
      'Confirm Book',
      "Add '" + book.title + "' by " + book.author + ' to your library?',
      () =>
        this.userService
          .addBookToLibrary(
            this.authService.decodedToken.nameid,
            this.selectedBook
          )
          .subscribe(
            () => {
              console.log('success');
              this.alertify.success('Added book to library');
            },
            (error) => {
              console.log('error');
              console.log(error);
              this.alertify.error(error);
            },
            () => {
              console.log('navigate');
              this.router.navigate([
                '/users/' + this.authService.decodedToken.nameid,
              ]);
            }
          ),
      () => {
        this.alertify.error('Canceled');
      }
    );

    console.log(this.selectedBook);
  }
}

