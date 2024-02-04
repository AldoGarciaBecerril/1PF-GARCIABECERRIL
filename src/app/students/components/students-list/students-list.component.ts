import { Component, OnInit } from '@angular/core';
/* RxJs */
import { Subject } from 'rxjs';
/* Interfaces */
import { IStudent } from '../../interface/student.interface';
/* Services */
import { StudentsService } from '../../services/students.service';
import { CoursesService } from '../../../courses/services/courses.service';
import { ICourse } from '../../../courses/interfaces/course.interface';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss',
})
export class StudentsListComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'fullName',
    'age',
    'actions',
  ];
  public students: IStudent[] = [];
  public students$: Subject<IStudent[]>;
  public showModal: boolean = false;
  public student: IStudent | undefined;
  public modalType: 'edit' | 'details' | 'none' = 'none';
  constructor(
    private _studentsService: StudentsService,
    private _coursesService: CoursesService
  ) {
    this.students$ = this._studentsService.getStudentsSubject();
  }
  ngOnInit(): void {
    this.students$.subscribe({
      next: (students: IStudent[]) => {
        console.log(students);
        this.students = [...students];
      },
      error: (err) => console.error(err),
    });
    this._studentsService.getStudents();
  }
  getStudentCourses(student: IStudent): ICourse[] {
    return this._coursesService.getCourses().filter((c: ICourse) => {
      return c.students.includes(student.id);
    });
  }
  editStudent(student: IStudent) {
    this.showModal = true;
    this.student = student;
    this.modalType = 'edit';
    this.student.courses = this.getStudentCourses(student);
    console.log('Edit student', student);
  }
  deleteStudent(student: IStudent) {
    this._studentsService.deleteStudent(student.id);
  }
  openDetailsStudent(student: IStudent) {
    this.showModal = true;
    this.student = student;
    this.student.courses = this.getStudentCourses(student);
    this.modalType = 'details';
    console.log('Open details student', student);
  }
}
