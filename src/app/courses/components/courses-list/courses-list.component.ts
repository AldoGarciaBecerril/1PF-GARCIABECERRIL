import { Component, OnInit } from '@angular/core';
/* RxJs */
import { Subject } from 'rxjs';
/* Interfaces */
import { ICourse } from '../../interfaces/course.interface';
import { IStudent } from '../../../students/interface/student.interface';
/* Services */
import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../../students/services/students.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent implements OnInit {
  public identity: IStudent | undefined;
  public identity$: Subject<IStudent | undefined>;
  public displayedColumns: string[] = [
    'id',
    'title',
    'teacher',
    'students',
    'actions',
  ];
  public courses: ICourse[] = [];
  public courses$: Subject<ICourse[]>;
  public showModal: boolean = false;
  public course: ICourse | undefined;
  public modalType: 'edit' | 'details' | 'none' = 'none';
  public loading: boolean = true;
  constructor(
    private _coursesService: CoursesService,
    private _studentsService: StudentsService,
    private _authService: AuthService
  ) {
    this.courses$ = this._coursesService.getCoursesSubject();
    this._studentsService.getStudents();
    this.identity$ = this._authService.identity$;
    this.identity$.subscribe({
      next: (identity: IStudent | undefined) => {
        this.identity = identity;
      },
      error: (err) => console.error(err),
    });
    this._authService.getIdentity();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
  ngOnInit(): void {
    this.courses$.subscribe({
      next: (courses: ICourse[]) => {
        console.log(courses);
        this.courses = courses;
      },
      error: (err) => console.error(err),
    });
    this._coursesService.getCourses();
  }
  editCourse(course: ICourse) {
    this.showModal = true;
    this.course = course;
    this.modalType = 'edit';
    console.log('Edit course', course);
  }
  deleteCourse(course: ICourse) {
    this._coursesService.deleteCourse(course.id);
  }
  openDetailsCourse(course: ICourse) {
    this.showModal = true;
    this.course = course;
    this.modalType = 'details';
    console.log('Open details course', course);
  }
}
