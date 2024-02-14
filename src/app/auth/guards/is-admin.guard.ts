import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
/* Services */
import { AuthService } from '../services/auth.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  const identity = _authService.getIdentity();
  if (!identity || identity.role !== 'admin') {
    alert('You are not an admin');
    _router.navigate(['/auth/login']);
    return false;
  } else {
    return true;
  }
};
