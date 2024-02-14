import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/* RxJs */
import { Observable, Subject, map } from 'rxjs';
/* Interfaces */
import { IStudent } from '../interface/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  public students: IStudent[] = [
    /* {
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
    }, */
  ];
  public students$: Subject<IStudent[]> = new Subject<IStudent[]>();
  constructor(private _http: HttpClient) {
    this.getStudents();
  }
  /* Create */
  public createStudent(student: IStudent): Observable<IStudent | undefined> {
    student.id = student.id || this.students[this.students.length - 1].id + 1;
    return this._http
      .post<IStudent | undefined>(
        'https://65cbf480efec34d9ed884d34.mockapi.io/student',
        student
      )
      .pipe(
        map((student: IStudent | undefined) => {
          if (student) {
            student.id =
              typeof student.id === 'number'
                ? student.id
                : parseInt(student.id);
            this.students.push(student);
            this.students$.next(this.students);
            return student;
          } else {
            return undefined;
          }
        })
      );
  }
  /* Read */
  public getStudents(): Observable<IStudent[]> {
    this.students$.next(this.students);
    return this._http
      .get<IStudent[]>('https://65cbf480efec34d9ed884d34.mockapi.io/student')
      .pipe(
        map((students: IStudent[]) => {
          students = students.map((student: IStudent) => {
            student.id =
              typeof student.id === 'number'
                ? student.id
                : parseInt(student.id);
            return student;
          });
          this.students = students;
          this.students$.next(this.students);
          return students;
        })
      );
  }
  public getStudent(id: number): Observable<IStudent | undefined> {
    return this._http
      .get<IStudent>(
        `https://65cbf480efec34d9ed884d34.mockapi.io/student/${id}`
      )
      .pipe(
        map((student: IStudent | undefined) => {
          if (student) {
            student.id =
              typeof student.id === 'number'
                ? student.id
                : parseInt(student.id);
            return student;
          } else {
            return undefined;
          }
        })
      );
  }
  public getStudentsSubject(): Subject<IStudent[]> {
    this.getStudents().subscribe({
      next: (students: IStudent[]) => {
        this.students = students;
        this.students$.next(this.students);
      },
    });
    return this.students$;
  }
  /* Update */
  public updateStudent(student: IStudent): Observable<IStudent | undefined> {
    return this._http
      .put<IStudent | undefined>(
        `https://65cbf480efec34d9ed884d34.mockapi.io/student/${student.id}`,
        student
      )
      .pipe(
        map((student: IStudent | undefined) => {
          if (student) {
            student.id =
              typeof student.id === 'number'
                ? student.id
                : parseInt(student.id);
            this.students.forEach((s, index) => {
              if (s.id === student.id) {
                this.students[index] = student;
              }
            });
            this.students$.next(this.students);
            return student;
          } else {
            return undefined;
          }
        })
      );
  }
  /* Delete */
  public deleteStudent(id: number): Observable<IStudent | undefined> {
    this.students = this.students.filter((s) => s.id !== id);
    this.students$.next(this.students);
    return this._http
      .delete<IStudent>(
        `https://65cbf480efec34d9ed884d34.mockapi.io/student/${id}`
      )
      .pipe(
        map((student: IStudent | undefined) => {
          if (student) {
            student.id =
              typeof student.id === 'number'
                ? student.id
                : parseInt(student.id);
            this.students = this.students.filter((s) => s.id !== id);
            this.students$.next(this.students);
            return student;
          } else {
            return undefined;
          }
        })
      );
  }
  /* Recharge */
  rechargeStudents() {
    this.students$.next(this.students);
  }
}
