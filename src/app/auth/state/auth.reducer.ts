import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { IAuthState } from '../interfaces/auth.state';

export const initialState: IAuthState = {
  loaded: false,
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.loadAuths, (state) => {
    return { ...state, loaded: false };
  }),
  on(AuthActions.loadAuthsSuccess, (state, authState: IAuthState) => {
    localStorage.setItem('ALDOAPP_student', JSON.stringify(authState.identity));
    return { ...state, loaded: true, identity: authState.identity };
  }),
  on(AuthActions.loadAuthsFailure, (state, err: unknown) => {
    console.error(err);
    return logout(state);
  }),
  on(AuthActions.logout, (state) => {
    return logout(state);
  })
);

function logout(state: IAuthState): IAuthState {
  localStorage.removeItem('ALDOAPP_student');
  return { ...state, loaded: false, identity: undefined };
}
