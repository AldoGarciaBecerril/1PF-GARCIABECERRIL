import { Component } from '@angular/core';
/* RxJs */
import { Subject } from 'rxjs';
/* Interfaces */
import { IStudent } from './students/interface/student.interface';
/* Services */
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public identity: IStudent | undefined;
  public identity$: Subject<IStudent | undefined>;
  constructor(private _authService: AuthService) {
    this.identity$ = this._authService.identity$;
    this.identity$.subscribe({
      next: (identity: IStudent | undefined) => {
        this.identity = identity;
      },
      error: (err) => console.error(err),
    });
    this._authService.getIdentity();
  }
}
