import { Component, computed, inject } from '@angular/core';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeService } from './services/employee';

@Component({
  selector: 'app-root',
  template: `
    <header class="max-w-6xl mx-auto px-6 pt-8 pb-4">
      <h1 class="text-3xl font-bold text-gray-900">Team Hub</h1>
      <p class="mt-1 text-gray-500">
        {{ activeCount() }} active users ·
        <span class="text-amber-600">⭐ {{ favoriteCount() }} favorites</span>
      </p>
    </header>
    <main>
      <app-employee-list />
    </main>
  `,
  imports: [EmployeeList],
})
export class App {
  private employeeService = inject(EmployeeService);
  employees = this.employeeService.employees;
  activeCount = computed(() => this.employees().filter((e) => e.isActive).length);
  favoriteCount = this.employeeService.favoriteCount;
}
