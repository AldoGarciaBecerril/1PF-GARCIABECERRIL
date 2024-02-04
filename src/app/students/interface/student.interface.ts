import { ICourse } from '../../courses/interfaces/course.interface';

export interface IStudent {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  courses?: ICourse[];
}
