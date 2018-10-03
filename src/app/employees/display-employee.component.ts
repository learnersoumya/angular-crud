import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {

  // private _employee: Employee;
  // @Input()
  // set employee(val: Employee) {
  //   console.log('Previous: ', this._employee ? this._employee.name : 'NULL');
  //   console.log('Current: ', val.name);
  //   this._employee = val;
  // }
  // get employee(): Employee  {
  //   return this._employee;
  // }
  private selectedEmployeeId: number;
  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();

  confirmDelete = false;

  constructor( private _route: ActivatedRoute,
               private _router: Router,
               private _employeeService: EmployeeService  ) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  ngOnChanges(changes: SimpleChanges) {
    // const previousEmployee = <Employee>changes.employee.previousValue;
    // const currentEmployee = <Employee>changes.employee.currentValue;
    // console.log('Previous Employee: ', previousEmployee ? previousEmployee.name : 'NULL');
    // console.log('Current Employee: ', currentEmployee.name);
  }

  handleClick(): void {
    this.notify.emit(this.employee);
  }

  getEmployeeNameAndGender(): string {
    return this.employee.name + ' ' + this.employee.gender;
  }

  viewEmployee(): void {
    this._router.navigate(['employees', this.employee.id], {
      queryParams: { 'serchTerm': this.searchTerm }
    });
  }

  editEmployee(): void {
    this._router.navigate(['edit', this.employee.id]);
  }

  deleteEmployee(): void {
    this._employeeService.deleteEmployee(this.employee.id);
    this.notifyDelete.emit(this.employee.id);
  }

}
