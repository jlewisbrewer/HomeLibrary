import { AlertifyService } from './../../_services/alertify.service';
import { BookService } from './../../_services/book.service';
import { Book } from './../../_models/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  
  constructor(private bookService: BookService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadBook();
  }

  loadBook() {
    this.bookService.getBook(+this.route.snapshot.params['id']).subscribe((book: Book) => {
      this.book = book;
    }, error => {
      this.alertify.error(error);
    });
  }

}
