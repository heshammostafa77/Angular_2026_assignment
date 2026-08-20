import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-department-filter',
  templateUrl: './department-filter.html',
  styleUrl: './department-filter.scss',
})
export class DepartmentFilter {
  employeeService = inject(EmployeeService);

  departments: ('Engineering' | 'Design' | 'Product' | 'Sales')[] =
    ['Engineering', 'Design', 'Product', 'Sales'];
}