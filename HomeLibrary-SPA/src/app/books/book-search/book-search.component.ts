import { Book } from './../../_models/book';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
export class BookSearchComponent implements OnInit {
  @Output() cancelSearch = new EventEmitter();
  book: Book;
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {}

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
      {validator: this.formValidator}
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
    console.log(this.searchForm.value);
  }

  cancel() {
    this.cancelSearch.emit(false);
  }
}
