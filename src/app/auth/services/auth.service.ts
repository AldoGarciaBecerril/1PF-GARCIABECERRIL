import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { IStudent } from '../../students/interface/student.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public identity: IStudent | undefined;
  public identity$: Subject<IStudent | undefined> = new Subject();
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
    this.identity = student;
    this.identity$.next(this.identity);
    localStorage.setItem('ALDOAPP_student', JSON.stringify(student));
  }
  getIdentity(): IStudent | undefined {
    const student = localStorage.getItem('ALDOAPP_student');
    this.identity = student ? JSON.parse(student) : undefined;
    this.identity$.next(this.identity);
    return this.identity;
  }
  removeIdentity(): void {
    this.identity = undefined;
    this.identity$.next(this.identity);
    localStorage.removeItem('ALDOAPP_student');
  }
}
