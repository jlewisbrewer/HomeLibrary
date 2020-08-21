import { AlertifyService } from './../../_services/alertify.service';
import { BookService } from './../../_services/book.service';
import { Book } from './../../_models/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.scss']
})
export class UserLibraryComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getUserBooks(+this.route.snapshot.params['id']).subscribe((books: Book[]) =>{
      this.books = books;
    }, error =>{
      this.alertify.error(error);
    });
  }

}
