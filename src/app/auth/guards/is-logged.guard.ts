import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/state/app.state';
import { selectAuthLoaded } from '../state/auth.selectors';
import { Observable, map } from 'rxjs';

export const isLoggedGuard: CanActivateFn = (
  route,
  state
): Observable<boolean> => {
  const _router = inject(Router);
  const _store: Store<AppState> = inject(Store);
  return _store.select(selectAuthLoaded).pipe(
    map((loaded: boolean) => {
      console.log('isLoggedGuard', loaded);
      if (!loaded) {
        alert('Loading...');
        _router.navigate(['/auth/login']);
        return false;
      } else {
        return true;
      }
    })
  );
};
