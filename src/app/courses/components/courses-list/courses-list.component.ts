import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';
import { Subject } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../../students/services/students.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent implements OnInit {
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
  constructor(private _coursesService: CoursesService) {
    this.courses$ = this._coursesService.getCoursesSubject();
  }
  ngOnInit(): void {
    this.courses$.subscribe({
      next: (courses: ICourse[]) => {
        console.log(courses);
        this.courses = [...courses];
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
