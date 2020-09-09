import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  confirm(
    title: string,
    message: string,
    okCallback: () => any,
    cancelCallback: () => any
  ): void {
    alertify.confirm(
      title,
      message,
      () => {
        okCallback();
      },
      () => {
        cancelCallback();
      }
    );
  }

  success(message: string): void {
    alertify.success(message);
  }

  error(message: string): void {
    alertify.error(message);
  }

  warning(message: string): void {
    alertify.warning(message);
  }

  message(message: string): void {
    alertify.message(message);
  }
}
