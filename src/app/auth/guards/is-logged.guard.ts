import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
/* Services */
import { AuthService } from '../services/auth.service';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  const identity = _authService.getIdentity();
  if (!identity) {
    alert('You are not logged');
    _router.navigate(['/auth/login']);
    return false;
  } else {
    return true;
  }
};
