import { Component } from '@angular/core';
/* Interfaces */
import { IStudent } from './students/interface/student.interface';
/* Store */
import { Store } from '@ngrx/store';
import { AppState } from './core/state/app.state';
import { selectAuthIdentity } from './auth/state/auth.selectors';
import { AuthActions } from './auth/state/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public identity: IStudent | undefined;
  constructor(private _store: Store<AppState>) {
    this._store.select(selectAuthIdentity).subscribe({
      next: (identity: IStudent | undefined) => {
        this.identity = identity;
      },
      error: (err) => console.error(err),
    });
    this._store.dispatch(AuthActions.loadAuths());
  }
}
