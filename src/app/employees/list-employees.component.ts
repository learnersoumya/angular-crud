import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
// import { ListEmployees } from '../data/Employees';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  // employees: Employee[] = ListEmployees;
  employees: Employee[];
  filteredEmployee: Employee[];
  employeeToDispaly: Employee;
  dataFromChild: Employee;
  private _searchTerm: string;
  private arrayIndex = 1;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployee = this.filterEmployees(value);
  }


  constructor( private _employeeService: EmployeeService,
               private _router: Router,
               private _route: ActivatedRoute ) { }

  ngOnInit() {
    /* Get data directly from employee service */
    //this.employees = this._employeeService.getEmployees();

    /* Get data through an observable */
    // this._employeeService.getEmployees().subscribe((empList) => {
    //   this.employees = empList;
    //   if (this._route.snapshot.queryParamMap.has('serchTerm')) {
    //     this.searchTerm = this._route.snapshot.queryParamMap.get('serchTerm');
    //   } else {
    //     this.filteredEmployee = this.employees;
    //   }
    // });
    
    //this.employeeToDispaly = this.employees[0];

    /** Get data from resolve activated route which is prefetched when route loaded */
    this.employees = this._route.snapshot.data['employeeList'];
    if (this._route.snapshot.queryParamMap.has('serchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('serchTerm');
    } else {
      this.filteredEmployee = this.employees;
    }

  }

  filterEmployees(searchString: string): Employee[] {
    return this.employees.filter(emp => emp.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  nextEmployee(): void {
    if (this.arrayIndex < this.employees.length) {
      this.employeeToDispaly = this.employees[this.arrayIndex];
      this.arrayIndex++;
    } else {
      this.employeeToDispaly = this.employees[0];
      this.arrayIndex = 1;
    }
  }

  handleNotify(eventPayload: Employee): void {
    this.dataFromChild = eventPayload;
  }

  onClick(employeeId: number): void {
    this._router.navigate(['employees', employeeId], {
      queryParams: { 'serchTerm': this.searchTerm, 'testParams': 'testParamValue' }
    });
  }

}
