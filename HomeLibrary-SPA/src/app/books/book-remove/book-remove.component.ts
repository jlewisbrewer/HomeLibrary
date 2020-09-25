import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { BookService } from './../../_services/book.service';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-book-remove',
  templateUrl: './book-remove.component.html',
  styleUrls: ['./book-remove.component.css'],
})
export class BookRemoveComponent implements OnInit {
  books: Book[];
  selectedBook: Book;

  constructor(
    private bookService: BookService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getUserBooks(+this.route.snapshot.params['id']).subscribe(
      (books) => {
        this.books = books.result;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  selectBook(book: Book) {
    this.selectedBook = book;
    console.log(this.selectedBook);
    this.alertify.confirm(
      'Confirm Removal',
      "Remove '" + book.title + "' by " + book.author + ' from your library?',
      () =>
        this.userService
          .removeBookFromLibrary(
            this.authService.decodedToken.nameid,
            this.selectedBook
          )
          .subscribe(
            () => {
              console.log('success');
              this.alertify.success('Removed book from library');
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
