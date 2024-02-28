import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from './auth.actions';
import { IStudent } from '../../students/interface/student.interface';
import { StudentsService } from '../../students/services/students.service';

@Injectable()
export class AuthEffects {
  loadAuths$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadAuths),
      concatMap(() => {
        let student: IStudent | string | null | undefined =
          localStorage.getItem('ALDOAPP_student');
        if (!student) {
          return of(
            AuthActions.loadAuthsFailure({
              error: 'No student found',
            })
          );
        } else {
          student = JSON.parse(student as string) as IStudent;
          return this._studentsService.getStudent(student.id).pipe(
            map((s: IStudent | undefined) => {
              if (!!s) {
                return AuthActions.loadAuthsSuccess({
                  loaded: true,
                  identity: s,
                });
              } else {
                return AuthActions.loadAuthsFailure({
                  error: 'No student found',
                });
              }
            }),
            catchError((error: unknown) =>
              of(AuthActions.loadAuthsFailure({ error }))
            )
          );
        }
      })
    );
  });

  constructor(
    private actions$: Actions,
    private _studentsService: StudentsService
  ) {}
}
