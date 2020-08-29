import { AlertifyService } from './../../_services/alertify.service';
import { BookService } from './../../_services/book.service';
import { BookForRegister } from './../../_models/bookForRegister';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  books: BookForRegister[];
  selectedBook: BookForRegister;
  
  constructor(private bookService: BookService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.books = this.bookService.books;
  }
  
  selectBook(book: BookForRegister) {
    this.selectedBook = book;
    // tslint:disable-next-line: max-line-length
    this.alertify.confirm('Confirm Book', 'Add \'' + book.title + '\' by ' + book.author + ' to your library?', () => this.bookService.addBookToLibrary(this.selectedBook), 'Canceled');

    console.log(this.selectedBook);
  }

}
