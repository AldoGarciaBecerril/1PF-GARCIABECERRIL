import { IStudent } from '../../students/interface/student.interface';

export interface IAuthState {
  loaded: boolean;
  identity?: IStudent;
}
