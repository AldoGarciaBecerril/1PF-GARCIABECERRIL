import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/* RxJs */
import { Observable, Subject, map } from 'rxjs';
/* Interfaces */
import { ICourse } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public courses: ICourse[] = [
    /* {
      id: 1,
      title: 'Angular',
      teacher: 1,
      students: [1, 2, 3, 10, 13, 5],
    },
    {
      id: 2,
      title: 'React',
      teacher: 2,
      students: [4, 5, 6, 1, 12],
    },
    {
      id: 3,
      title: 'Vue',
      teacher: 3,
      students: [7, 8, 9, 2, 6],
    }, */
  ];
  public courses$: Subject<ICourse[]> = new Subject<ICourse[]>();

  constructor(private _http: HttpClient) {
    this.getCourses();
  }
  /* Create */
  public createCourse(course: ICourse): Observable<ICourse | undefined> {
    course.id = course.id || this.courses[this.courses.length - 1].id + 1;
    return this._http
      .post<ICourse | undefined>(
        `https://65cbf480efec34d9ed884d34.mockapi.io/course`,
        course
      )
      .pipe(
        map((course: ICourse | undefined) => {
          if (course) {
            course.id =
              typeof course.id === 'number' ? course.id : parseInt(course.id);
            this.courses.push(course);
            this.courses$.next(this.courses);
            return course;
          } else {
            return undefined;
          }
        })
      );
  }
  /* Read */
  public getCourses(): Observable<ICourse[]> {
    this.courses$.next(this.courses);
    return this._http
      .get<ICourse[]>(`https://65cbf480efec34d9ed884d34.mockapi.io/course`)
      .pipe(
        map((courses: ICourse[]) => {
          courses = courses.map((course: ICourse) => {
            course.id =
              typeof course.id === 'number' ? course.id : parseInt(course.id);
            return course;
          });
          this.courses = courses;
          this.courses$.next(this.courses);
          return courses;
        })
      );
  }
  public getCourse(id: number): Observable<ICourse | undefined> {
    return this._http
      .get<ICourse>(`https://65cbf480efec34d9ed884d34.mockapi.io/course/${id}`)
      .pipe(
        map((course: ICourse | undefined) => {
          if (course) {
            course.id =
              typeof course.id === 'number' ? course.id : parseInt(course.id);
            return course;
          } else {
            return undefined;
          }
        })
      );
  }
  public getCoursesSubject(): Subject<ICourse[]> {
    this.getCourses().subscribe({
      next: (courses: ICourse[]) => {
        this.courses = courses;
        this.courses$.next(this.courses);
      },
    });
    return this.courses$;
  }
  /* Update */
  public updateCourse(course: ICourse): Observable<ICourse | undefined> {
    return this._http
      .put<ICourse | undefined>(
        `https://65cbf480efec34d9ed884d34.mockapi.io/course/${course.id}`,
        course
      )
      .pipe(
        map((course: ICourse | undefined) => {
          if (course) {
            course.id =
              typeof course.id === 'number' ? course.id : parseInt(course.id);
            this.courses.forEach((c, index) => {
              if (c.id === course.id) {
                this.courses[index] = course;
              }
            });
            this.courses$.next(this.courses);
            return course;
          } else {
            return undefined;
          }
        })
      );
  }
  /* Delete */
  public deleteCourse(id: number): Observable<ICourse | undefined> {
    return this._http
      .delete<ICourse | undefined>(
        `https://65cbf480efec34d9ed884d34.mockapi.io/course/${id}`
      )
      .pipe(
        map((course: ICourse | undefined) => {
          if (course) {
            course.id =
              typeof course.id === 'number' ? course.id : parseInt(course.id);
            this.courses = this.courses.filter((c) => c.id !== id);
            this.courses$.next(this.courses);
            return course;
          } else {
            return undefined;
          }
        })
      );
  }
}
