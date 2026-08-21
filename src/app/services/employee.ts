import { computed, Injectable, signal } from '@angular/core';
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

  //favoriteIds = signal<Set<number>>(new Set());
  favoriteIds = signal<number[]>([]);
  favoriteCount = computed(() => this.favoriteIds().length);

  toggleFavoriteId(id: number): void {
    const current = this.favoriteIds();
    if (current.includes(id)) {
      this.favoriteIds.set(current.filter((x) => x !== id));
    } else {
      this.favoriteIds.set([...current, id]);
    }
  }

  // toggleFavoriteId(id: number): void {
  //   const updated = new Set(this.favoriteIds());
  //   if (updated.has(id)) {
  //     updated.delete(id);
  //   } else {
  //     updated.add(id);
  //   }
  //   this.favoriteIds.set(updated);
  // }
}
