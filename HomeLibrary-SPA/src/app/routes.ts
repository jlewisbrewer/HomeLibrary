import { UserLibraryResolver } from './_resolvers/user-library.resolver';
import { User } from './_models/user';
import { UserLibraryComponent } from './users/user-library/user-library.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { AuthGuard } from './_guards/auth.guard';
import { BookSearchComponent } from './books/book-search/book-search.component';
import { BookRemoveComponent } from './books/book-remove/book-remove.component';
import { BookAddComponent } from './books/book-add/book-add.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'users/:id', component: UserLibraryComponent, resolve: { books: UserLibraryResolver}},
      { path: 'books', component: BookListComponent },
      { path: 'books/:id', component: BookDetailComponent},
      { path: 'users/:id/search', component: BookSearchComponent },
      { path: 'users/:id/add', component: BookAddComponent },
      { path: 'users/:id/remove', component: BookRemoveComponent, resolve: {books: UserLibraryResolver}}
    ]
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
