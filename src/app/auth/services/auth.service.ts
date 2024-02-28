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
}
