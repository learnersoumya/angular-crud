import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee;
  private _id: number;
  constructor( private _route: ActivatedRoute,
               private _employeeService: EmployeeService,
               private _router: Router ) { }

  ngOnInit() {
    //param map approach
    //const id = +this._route.snapshot.params['id']; // compatible for angular 2 and 4
    //this._id = +this._route.snapshot.paramMap.get('id');
    //this.employee = this._employeeService.getEmployee(this._id);

    // observable approach
    this._route.paramMap.subscribe(params => {
      this._id = +params.get('id');
      this.employee = this._employeeService.getEmployee(this._id);
    });
  }

  viewNextEmployee(): void {
    if (this._id < this._employeeService.getEmployeeCount()) {
      this._id = this._id + 1;
    } else {
      this._id = 1;
    }
    this._router.navigate(['/employees', this._id]);
  }

}
