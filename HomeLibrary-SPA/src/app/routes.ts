import { AuthGuard } from './_guards/auth.guard';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookRemoveComponent } from './book-remove/book-remove.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookListComponent } from './book-list/book-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'books', component: BookListComponent },
      { path: 'books/search', component: BookSearchComponent },
      { path: 'books/add', component: BookAddComponent },
      { path: 'books/remove', component: BookRemoveComponent }
    ]
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
