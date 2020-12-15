import { AuthService } from './../../_services/auth.service';
import { BookForRegister } from './../../_models/bookForRegister';
import { AlertifyService } from './../../_services/alertify.service';
import { BookService } from './../../_services/book.service';
import { Book } from './../../_models/book';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
export class BookSearchComponent implements OnInit {
  @Output() cancelSearch = new EventEmitter();
  books: BookForRegister[];
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private alertify: AlertifyService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = this.fb.group(
      {
        title: [''],
        author: [''],
        isbn: [''],
      },
      { validator: this.formValidator }
    );
  }

  formValidator(g: FormGroup) {
    if (
      g.get('title').value !== '' ||
      g.get('author').value !== '' ||
      g.get('isbn').value !== ''
    ) {
      return null;
    }
    return { empty: true };
  }

  search() {
    if (this.searchForm.valid) {
      this.bookService.getSearchResults(this.searchForm.value).subscribe(
        () => {

          this.router.navigate(['users/' + this.authService.decodedToken.nameid +  '/add']);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    }
  }

  cancel() {
    this.cancelSearch.emit(false);
  }
}
