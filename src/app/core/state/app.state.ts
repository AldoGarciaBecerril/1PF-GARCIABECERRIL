import { ActionReducerMap } from '@ngrx/store';
import { IAuthState } from '../../auth/interfaces/auth.state';
import { AuthReducer } from '../../auth/state/auth.reducer';
export interface AppState {
  auth: IAuthState;
}
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  auth: AuthReducer,
};
