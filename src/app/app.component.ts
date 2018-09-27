import { Component } from '@angular/core';
import {
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoadingIndicator = true;
  constructor(private _router: Router) {
    this._router.events.subscribe((routerEvents: Event) => {
      if (routerEvents instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvents instanceof NavigationEnd ||
        routerEvents instanceof NavigationCancel ||
        routerEvents instanceof NavigationError) {
        this.showLoadingIndicator = false;
      }
    });
  }
}
