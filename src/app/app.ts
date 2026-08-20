import { Component, computed, inject } from "@angular/core";
import { EmployeeList } from "./components/employee-list/employee-list";
import { EmployeeService } from "./services/employee";


@Component({
  selector: 'app-root',
  template: `
  <header>
    <h1> Team Hub</h1>
    <p>{{activeCount()}} active users</p>
  </header>
  <main>
    <app-employee-list/>
  </main>
  `,
  imports: [EmployeeList],


})
export class App{
  private employeeService=inject(EmployeeService);
  employees=this.employeeService.employees;
  activeCount = computed(() => this.employees().filter(e => e.isActive).length);
}
