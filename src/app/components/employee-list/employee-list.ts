import { Component, computed, effect, inject, signal } from '@angular/core';
import { EmployeeCard } from '../employee-card/employee-card';
import { EmployeeService } from '../../services/employee';
import { DepartmentFilter } from '../department-filter/department-filter';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  imports: [EmployeeCard, DepartmentFilter],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {
  private employeeService = inject(EmployeeService);
  employees = this.employeeService.employees;

  favoriteIds = signal<Set<number>>(new Set())

  onSelect(employee: Employee) {
  console.log('selected:', employee);
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
    const updated = new Set(this.favoriteIds());
    if (updated.has(employee.id)) {
      updated.delete(employee.id);
    } else {
      updated.add(employee.id);
    }
    this.favoriteIds.set(updated);
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
