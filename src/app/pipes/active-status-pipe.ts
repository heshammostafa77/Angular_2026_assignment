import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'activeStatus' })
export class ActiveStatus implements PipeTransform {
  transform(value: boolean): string {
    return value ? '✅ Active' : '🌙 On Leave';
  }
} 