import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class EmployeeService {
  private listEmployees: Employee[] = [
    {
        id: 1,
        name: 'Mark',
        gender: 'Male',
        contactPreference: 'Email',
        email: 'mark@gmail.com',
        dateOfBirth: new Date('10/25/1988'),
        department: '3',
        isActive: true,
        photoPath: 'assets/images/mark.png'
    },
    {
        id: 2,
        name: 'Mary',
        gender: 'Female',
        contactPreference: 'Phone',
        email: 'mary@gmail.com',
        phoneNumber: 9865875820,
        dateOfBirth: new Date('11/20/1986'),
        department: '2',
        isActive: true,
        photoPath: 'assets/images/mary.png'
    },
    {
        id: 3,
        name: 'John',
        gender: 'Male',
        contactPreference: 'Phone',
        phoneNumber: 7865808188,
        dateOfBirth: new Date('03/12/1981'),
        department: '3',
        isActive: false,
        photoPath: 'assets/images/john.png'
    }
];
  constructor() { }
  getEmployees(): Observable<Employee[]> {
      return Observable.of(this.listEmployees).delay(2000);
  }

  getEmployee(id: number): Employee {
    return this.listEmployees.find(e => e.id === id);
  }

  save(employee: Employee): void {
    this.listEmployees.push(employee);
  }

  getEmployeeCount(): number {
      return this.listEmployees.length;
  }

}
