import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/state/app.state';
import { selectAuthIdentityRole } from '../state/auth.selectors';
import { Observable, map } from 'rxjs';

export const isAdminGuard: CanActivateFn = (
  route,
  state
): Observable<boolean> => {
  const _router = inject(Router);
  const _store: Store<AppState> = inject(Store);
  return _store.select(selectAuthIdentityRole).pipe(
    map((role: undefined | 'user' | 'admin' | 'teacher') => {
      console.log('isAdminGuard', role);
      if (!!role && role === 'admin') {
        return true;
      } else {
        alert('Loading...');
        _router.navigate(['/auth/login']);
        return false;
      }
    })
  );
};
