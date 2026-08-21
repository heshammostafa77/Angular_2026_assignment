import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { ActiveStatus } from '../../pipes/active-status-pipe';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.html',
  imports: [ActiveStatus],
  styleUrl: './employee-detail.scss',
})
export class EmployeeDetail {
  @Input({ required: true }) employee!: Employee;
}