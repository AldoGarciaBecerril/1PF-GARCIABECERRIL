import { Injectable } from '@angular/core';
/* RxJs */
import { Subject } from 'rxjs';
/* Interfaces */
import { ICourse } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public courses: ICourse[] = [
    {
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
    },
  ];
  public courses$: Subject<ICourse[]> = new Subject<ICourse[]>();

  constructor() {
    this.courses$.next(this.courses);
  }
  /* Create */
  public createCourse(course: ICourse): void {
    course.id = course.id || this.courses[this.courses.length - 1].id + 1;
    this.courses.push(course);
    this.courses$.next(this.courses);
  }
  /* Read */
  public getCourses(): ICourse[] {
    this.courses$.next(this.courses);
    return this.courses;
  }
  public getCourse(id: number): ICourse | undefined {
    return this.courses.find((c) => c.id === id);
  }
  public getCoursesSubject(): Subject<ICourse[]> {
    return this.courses$;
  }
  /* Update */
  public updateCourse(course: ICourse): void {
    this.courses.forEach((c, index) => {
      if (c.id === course.id) {
        this.courses[index] = course;
      }
    });
    this.courses$.next(this.courses);
  }
  /* Delete */
  public deleteCourse(id: number): void {
    this.courses = this.courses.filter((c) => c.id !== id);
    this.courses$.next(this.courses);
  }
}
