import { Injectable, signal } from '@angular/core';

@Injectable()
export class NotificationService {
  message = signal<string | null>(null);

  show(msg: string) {
    this.message.set(msg);
    setTimeout(() => this.message.set(null), 3000);
  }
}