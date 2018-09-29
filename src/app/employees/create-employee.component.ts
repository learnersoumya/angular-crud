import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto = false;
  panelTitle: string;
  employee: Employee;
  departments: Department[] = [
    {id: 1, name: 'Help Desk'},
    {id: 2, name: 'HR'},
    {id: 3, name: 'IT'},
    {id: 4, name: 'Payroll'},
    {id: 5, name: 'Admin'}
  ];
  bsDatePicker: Partial<BsDatepickerConfig>;
  constructor( private _employeeService: EmployeeService,
               private _router: Router,
               private _route: ActivatedRoute ) {
    this.bsDatePicker = Object.assign({},
      {
          containerClass : 'theme-dark-blue',
          showWeekNumbers: false,
          maxDate: new Date(),
          dateInputFormat: 'DD/MM/YYYY'
       }
   );
  }

  ngOnInit() {
    this._route.paramMap.subscribe(routeParameter => {
      const id = +routeParameter.get('id');
      this.getEmployee(id);
    });
  }

  getEmployee(id: number): void {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: '',
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      this.employee = Object.assign({}, this._employeeService.getEmployee(id));
    }
  }

  saveEmployee(): void {
    const employeeObject: Employee = Object.assign({}, this.employee);
    this._employeeService.save(employeeObject);
    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }

}
