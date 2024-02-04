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
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      age: 24,
    },
    {
      id: 3,
      firstName: 'Jim',
      lastName: 'Doe',
      age: 23,
    },
    {
      id: 4,
      firstName: 'Jill',
      lastName: 'Doe',
      age: 22,
    },
    {
      id: 5,
      firstName: 'Jack',
      lastName: 'Doe',
      age: 21,
    },
    {
      id: 6,
      firstName: 'Jenny',
      lastName: 'Doe',
      age: 20,
    },
    {
      id: 7,
      firstName: 'Jeff',
      lastName: 'Doe',
      age: 19,
    },
    {
      id: 8,
      firstName: 'Jen',
      lastName: 'Doe',
      age: 18,
    },
    {
      id: 9,
      firstName: 'Jesse',
      lastName: 'Doe',
      age: 17,
    },

    {
      id: 10,
      firstName: 'Raul',
      lastName: 'Rojo',
      age: 19,
    },
    {
      id: 11,
      firstName: 'Jose Luis',
      lastName: 'Cacharganas',
      age: 23,
    },
    {
      id: 12,
      firstName: 'Juan',
      lastName: 'Perez',
      age: 25,
    },
    {
      id: 13,
      firstName: 'Rafael',
      lastName: 'Novoa',
      age: 27,
    },
    {
      id: 14,
      firstName: 'Raul',
      lastName: 'Gomez',
      age: 32,
    },
    {
      id: 15,
      firstName: 'Romina',
      lastName: 'Alcala',
      age: 20,
    },
    {
      id: 16,
      firstName: 'Jessica',
      lastName: 'Mondragon',
      age: 19,
    },
    {
      id: 17,
      firstName: 'Paloma',
      lastName: 'Aguirre',
      age: 24,
    },
    {
      id: 18,
      firstName: 'Alondra',
      lastName: 'Cruz',
      age: 29,
    },
    {
      id: 19,
      firstName: 'Debora',
      lastName: 'Melcacho',
      age: 18,
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
