import { Component, OnDestroy } from '@angular/core';
/* Interfaces */
import { IStudent } from '../../../students/interface/student.interface';
/* Store */
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/app.state';
import { selectAuthIdentity } from '../../../auth/state/auth.selectors';
import { AuthActions } from '../../../auth/state/auth.actions';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
export interface IMyRoutes {
  path: string;
  title: string;
}
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent implements OnDestroy {
  public identity: IStudent | undefined;
  public myRoutes: IMyRoutes[] = [];
  /* Utility */
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _router: Router, private _store: Store<AppState>) {
    this._store
      .select(selectAuthIdentity)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
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
    this._store.dispatch(AuthActions.loadAuths());
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.complete();
  }
  logout() {
    this._store.dispatch(AuthActions.logout());
    this._router.navigate(['/auth/login']);
  }
}
