import { PaginatedResult, Pagination } from './../../_models/pagination';
import { AlertifyService } from './../../_services/alertify.service';
import { BookService } from './../../_services/book.service';
import { Book } from './../../_models/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.scss'],
})
export class UserLibraryComponent implements OnInit {
  books: Book[];
  pagination: Pagination;
  userParams: any = {};
  showBoundaryLinks = true;

  constructor(
    private bookService: BookService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.books = data['books'].result;
      this.pagination = data['books'].pagination;
    });

    this.userParams.authorFilter = '';
    this.userParams.titleFilter = '';
    this.userParams.publisherFilter = '';
  }

  resetFilters(): void {
    this.userParams.authorFilter = '';
    this.userParams.titleFilter = '';
    this.userParams.publisherFilter = '';
    this.loadBooks();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService
      .getUserBooks(
        +this.route.snapshot.params['id'],
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      )
      .subscribe(
        (res: PaginatedResult<Book[]>) => {
          this.books = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
