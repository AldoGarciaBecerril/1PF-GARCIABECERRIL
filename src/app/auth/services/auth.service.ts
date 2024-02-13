import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IStudent } from '../../students/interface/student.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  login(email: string, password: string): Observable<IStudent | undefined> {
    return this._http
      .get<IStudent[]>('https://65cbf480efec34d9ed884d34.mockapi.io/student')
      .pipe(
        map((students: IStudent[]) =>
          students.find(
            (student: IStudent) =>
              student.email === email && student.password === password
          )
        )
      );
  }
  saveIdentity(student: IStudent): void {
    localStorage.setItem('ALDOAPP_student', JSON.stringify(student));
  }
  getIdentity(): IStudent | undefined {
    const student = localStorage.getItem('ALDOAPP_student');
    return student ? JSON.parse(student) : undefined;
  }
  removeIdentity(): void {
    localStorage.removeItem('ALDOAPP_student');
  }
}
