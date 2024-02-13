import { Injectable } from '@angular/core';
/* RxJs */
import { Subject } from 'rxjs';
/* Interfaces */
import { IStudent } from '../interface/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  public students: IStudent[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      email: 'john_doe@myapp.com',
      password: 'pass',
      role: 'admin',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      age: 24,
      email: 'jane_doe@myapp.com',
      password: 'pass',
      role: 'user',
    },
    {
      id: 3,
      firstName: 'Jim',
      lastName: 'Doe',
      age: 23,
      email: 'jim_doe@myapp.com',
      password: 'pass',
      role: 'user',
    },
    {
      id: 4,
      firstName: 'Jill',
      lastName: 'Doe',
      age: 22,
      email: 'jill_doe@myapp.com',
      password: 'pass',
      role: 'user',
    },
    {
      id: 5,
      firstName: 'Jack',
      lastName: 'Doe',
      age: 21,
      email: 'jack_doe@myapp.com',
      password: 'pass',
      role: 'user',
    },
    {
      id: 6,
      firstName: 'Jenny',
      lastName: 'Doe',
      age: 20,
      email: 'jenny_doe@myapp.com',
      password: 'pass',
      role: 'user',
    },
    {
      id: 7,
      firstName: 'Jeff',
      lastName: 'Doe',
      age: 19,
      email: 'jeff_doe@myapp.com',
      password: 'pass',
      role: 'user',
    },
  ];
  public students$: Subject<IStudent[]> = new Subject<IStudent[]>();
  constructor() {
    this.students$.next(this.students);
  }
  /* Create */
  public createStudent(student: IStudent): void {
    student.id = student.id || this.students[this.students.length - 1].id + 1;
    this.students.push(student);
    this.students$.next(this.students);
  }
  /* Read */
  public getStudents(): IStudent[] {
    this.students$.next(this.students);
    return this.students;
  }
  public getStudent(id: number): IStudent | undefined {
    return this.students.find((s) => s.id === id);
  }
  public getStudentsSubject(): Subject<IStudent[]> {
    return this.students$;
  }
  /* Update */
  public updateStudent(student: IStudent): void {
    this.students.forEach((s, index) => {
      if (s.id === student.id) {
        this.students[index] = student;
      }
    });
    this.students$.next(this.students);
  }
  /* Delete */
  public deleteStudent(id: number): void {
    this.students = this.students.filter((s) => s.id !== id);
    this.students$.next(this.students);
  }
}
