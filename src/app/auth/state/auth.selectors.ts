import { createSelector } from '@ngrx/store';
import { AppState } from '../../core/state/app.state';
import { IAuthState } from '../interfaces/auth.state';
import { IStudent } from '../../students/interface/student.interface';

export const selectAuthState = (state: AppState): IAuthState => state.auth;

export const selectAuthLoaded = createSelector(
  selectAuthState,
  (authState: IAuthState): boolean => authState.loaded
);

export const selectAuthIdentity = createSelector(
  selectAuthState,
  (authState: IAuthState): IAuthState['identity'] => authState.identity
);

export const selectAuthIdentityRole = createSelector(
  selectAuthIdentity,
  (identity: IAuthState['identity']): IStudent['role'] | undefined =>
    identity?.role
);
