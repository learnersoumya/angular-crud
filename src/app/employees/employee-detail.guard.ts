import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeDetailGuard implements CanActivate {
  constructor( private _router: Router,
               private _employeeService: EmployeeService ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const employeExists = !!this._employeeService.getEmployee(+next.paramMap.get('id'));
      if (employeExists) {
        return true;
      } else {
        this._router.navigate(['notfound']);
        return false;
      }
  }
}
