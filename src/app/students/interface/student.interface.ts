import { ICourse } from '../../courses/interfaces/course.interface';

export interface IStudent {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: 'user' | 'admin';
  courses?: ICourse[];
}
