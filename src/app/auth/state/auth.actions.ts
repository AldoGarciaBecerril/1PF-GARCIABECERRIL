import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAuthState } from '../interfaces/auth.state';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Load Auths': emptyProps(),
    'Load Auths Success': props<IAuthState>(),
    'Load Auths Failure': props<{ error: unknown }>(),
    Logout: emptyProps(),
  },
});
