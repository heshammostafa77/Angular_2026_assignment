import { Component, inject, input, Input, output } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { Highlight } from '../../directives/highlight';
import { DepartmentLabelPipe } from '../../pipes/department-label-pipe';
import { EmployeeService } from '../../services/employee';
import { Tooltip } from '../../directives/tooltip';
import { ActiveStatus } from '../../pipes/active-status-pipe';
@Component({
  selector: 'app-employee-card',
  imports: [Highlight, DepartmentLabelPipe, Tooltip, ActiveStatus],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.scss',
})
export class EmployeeCard {
  //@Input({required: true}) employee!: Employee;
  private employeeService = inject(EmployeeService);
  employee = input.required<Employee>();
  isFavorite = input<boolean>(false);

  select = output<Employee>();
  toggleFavorite = output<Employee>();

  onToggleFavorite(event: Event) {
    event.stopPropagation();
    this.toggleFavorite.emit(this.employee());
  }

  remove(): void {
    this.employeeService.removeEmployee(this.employee().id);
  }

  removeClick(event: Event): void {
    event.stopPropagation();
    this.remove();
  }
}
