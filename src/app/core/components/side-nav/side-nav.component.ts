import { Component } from '@angular/core';
/* RxJs */
import { Subject } from 'rxjs';
/* Interfaces */
import { IStudent } from '../../../students/interface/student.interface';
/* Services */
import { AuthService } from '../../../auth/services/auth.service';
export interface IMyRoutes {
  path: string;
  title: string;
}
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  public identity: IStudent | undefined;
  public identity$: Subject<IStudent | undefined>;
  public myRoutes: IMyRoutes[] = [];
  constructor(private _authService: AuthService) {
    this.identity$ = this._authService.identity$;
    this.identity$.subscribe({
      next: (identity: IStudent | undefined) => {
        this.identity = identity;
        if (!this.identity) {
          this.myRoutes = [
            {
              path: '/',
              title: 'Home',
            },
            {
              path: '/auth',
              title: 'Login',
            },
            {
              path: '/auth/register',
              title: 'Register',
            },
          ];
        } else {
          this.myRoutes = [
            {
              path: '/',
              title: 'Home',
            },
          ];
          if (this.identity.role === 'admin') {
            this.myRoutes.push({
              path: '/students',
              title: 'Students',
            });
          }
          this.myRoutes.push({
            path: '/courses',
            title: 'Courses',
          });
        }
      },
      error: (err) => console.error(err),
    });
    this._authService.getIdentity();
  }
  logout() {
    this._authService.removeIdentity();
  }
}
