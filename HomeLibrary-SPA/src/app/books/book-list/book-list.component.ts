import { AlertifyService } from '../../_services/alertify.service';
import { BookService } from '../../_services/book.service';
import { Book } from '../../_models/book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((books: Book[]) =>{
      this.books = books;
    }, error =>{
      this.alertify.error(error);
    });
  }

}
