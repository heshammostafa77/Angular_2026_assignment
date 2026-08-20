import { Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees = signal<Employee[]>([
    {
      id: 1,
      name: 'Sara Ahmed',
      role: 'Frontend Engineer',
      department: 'Engineering',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      isActive: true,
    },
    {
      id: 2,
      name: 'Omar Khaled',
      role: 'Product Designer',
      department: 'Design',
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
      isActive: true,
    },
    {
      id: 3,
      name: 'Lina Chen',
      role: 'Product Manager',
      department: 'Product',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
      isActive: false,
    },
  ]);

  // getAll() {
  //   return this.employees.asReadonly();
  // }
  selectedDepartment = signal<string | null>(null);
  
  addEmployee(employee: Employee): void {
    this.employees.update((employees) => [...employees, employee]);
  }

  removeEmployee(id: number): void {
    this.employees.update((list) => list.filter((e) => e.id !== id));
  }
  toggleDepartment(department: string): void {
    this.selectedDepartment.update((current) => (current === department ? null : department));
  }
}
