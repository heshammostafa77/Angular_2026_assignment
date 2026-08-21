import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { EmployeeCard } from '../employee-card/employee-card';
import { EmployeeService } from '../../services/employee';
import { DepartmentFilter } from '../department-filter/department-filter';
import { Employee } from '../../models/employee.model';
import { Panel } from '../panel/panel';
import { EmployeeDetail } from '../employee-detail/employee-detail';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-employee-list',
  imports: [EmployeeCard, DepartmentFilter, Panel, EmployeeDetail],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
  providers: [NotificationService],
})
export class EmployeeList {
  private employeeService = inject(EmployeeService);
  employees = this.employeeService.employees;
  selectedEmployee = signal<Employee | null>(null);
  favoriteIds = this.employeeService.favoriteIds;
  notifications = inject(NotificationService);
  favoriteEmployees = computed(() =>
    this.employees().filter((employee) => this.favoriteIds().has(employee.id)),
  );
    favoritesSection = viewChild<ElementRef<HTMLElement>>('favoritesSection');

  jumpToFavorites() {
    this.favoritesSection()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  onSelect(employee: Employee) {
    this.selectedEmployee.set(employee);
  }

  addTestEmployee() {
    console.log('Adding test employee...');

    this.employeeService.addEmployee({
      id: Date.now(),
      name: 'Test Employee',
      role: 'Test Role',
      department: 'Engineering',
      avatarUrl: 'https://i.pravatar.cc/150?img=4',
      isActive: true,
    });
    console.log('employees:', this.employees());
  }

  onToggleFavorite(employee: Employee) {
    const wasFavorite = this.favoriteIds().has(employee.id);
    this.employeeService.toggleFavoriteId(employee.id);

    if (wasFavorite) {
      this.notifications.show(`${employee.name} removed from favorites`);
    } else {
      this.notifications.show(`⭐ ${employee.name} added to favorites`);
    }
  }

  searchTerm = signal('');
  searchedEmployees = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.employees().filter((employee) => employee.name.toLowerCase().includes(term));
  });

  filteredEmployees = computed(() => {
    const dept = this.employeeService.selectedDepartment();
    return this.searchedEmployees().filter((employee) => !dept || employee.department === dept);
  });

  constructor() {
    effect(() => {
      localStorage.setItem('searchTerm', this.searchTerm());
    });

    effect(() => {
      document.title = `TeamHub (${this.filteredEmployees().length})`;
    });
  }
}
