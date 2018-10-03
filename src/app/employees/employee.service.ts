import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch'; // Patch operator.
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


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
  constructor( private _httpClient: HttpClient ) { }

  getEmployees(): Observable<Employee[]> {
      // return Observable.of(this.listEmployees).delay(2000);
      return this._httpClient.get<Employee[]>('http://localhost:3000/employees')
                             // .catch(this.haldleError); // this is how to use patch operator
                             .pipe(catchError(this.haldleError)); // this is how to use pipable operator
  }

  private haldleError(errorResponse: HttpErrorResponse) {
      if (errorResponse.error instanceof ErrorEvent) {
          // client side error
          console.log('Client side error ', errorResponse.error.message);
      } else {
          // server side error
          console.log('Server side error ', errorResponse);
      }

      return new ErrorObservable('There is a problem with the service. We are noified and working on it. Please try again later');
  }

  getEmployee(id: number): Employee {
    return this.listEmployees.find(e => e.id === id);
  }

  // save method for local array model
//   save(employee: Employee): void {
//       if (employee.id === null) {
//         const maxId = this.listEmployees.reduce((e1, e2) => {
//             return (e1 > e2) ? e1 : e2;
//         }).id;
//         employee.id = maxId + 1;
//         this.listEmployees.push(employee);
//       } else {
//           const foundindex = this.listEmployees.findIndex(emp => emp.id === employee.id);
//           this.listEmployees[foundindex] = employee;
//       }
//   }

// save method for httpClient service post

save(employee: Employee): Observable<Employee> {
    if (employee.id === null) {
      return this._httpClient.post<Employee>('http://localhost:3000/employees', employee, {
        headers: new HttpHeaders({
            'Content-type': 'application/json'
        })
      }).pipe( catchError( this.haldleError ));
    } else {
        const foundindex = this.listEmployees.findIndex(emp => emp.id === employee.id);
        this.listEmployees[foundindex] = employee;
    }
}

  getEmployeeCount(): number {
      return this.listEmployees.length;
  }

  deleteEmployee(id: number): void {
     const index = this.listEmployees.findIndex(emp => emp.id === id);
     if (index !== -1) {
        this.listEmployees.splice(index, 1);
     }
  }

}
