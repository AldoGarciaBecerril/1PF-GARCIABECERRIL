import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IStudent } from '../../interface/student.interface';
import { StudentsService } from '../../services/students.service';
import { ICourse } from '../../../courses/interfaces/course.interface';
import { CoursesService } from '../../../courses/services/courses.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-abm-students',
  templateUrl: './abm-students.component.html',
  styleUrl: './abm-students.component.scss',
})
export class ABMStudentsComponent implements OnInit, OnDestroy {
  @Input() student: IStudent | undefined;
  @Output() submitted: EventEmitter<void> = new EventEmitter<void>();
  public studentFormGroup: FormGroup;
  public courses: ICourse[] = [];
  /* Utility */
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private formBuilder: FormBuilder,
    private _studentsService: StudentsService,
    private _coursesService: CoursesService
  ) {
    this.studentFormGroup = this.formBuilder.group({
      firstName: this.formBuilder.control('', Validators.required),
      lastName: this.formBuilder.control('', Validators.required),
      age: this.formBuilder.control(Number(), Validators.required),
      email: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required),
      role: this.formBuilder.control('user', Validators.required),
    });
  }
  ngOnInit(): void {
    if (!!this.student) {
      this.studentFormGroup.patchValue(this.student);
    }
    this.getCourses();
  }
  ngOnDestroy(): void {
    this.studentFormGroup.reset();
    this._unsubscribeAll.complete();
  }
  getCourses() {
    this._coursesService
      .getCoursesSubject()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (courses: ICourse[]) => {
          this.courses = courses;
        },
        error: (err) => {
          console.error(err);
          this.courses = [];
        },
      });
  }
  manageStudent() {
    if (this.studentFormGroup.invalid) {
      return alert('Form invalid');
    } else {
      let student: IStudent = this.studentFormGroup.value;
      if (!!this.student) {
        student.id = this.student.id;
        this._studentsService
          .updateStudent(student)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe({
            next: (student: IStudent | undefined) => {
              alert('Student updated');
            },
            error: (err) => {
              alert('Error updating student');
            },
          });
      } else {
        this._studentsService
          .createStudent(student)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe({
            next: (student: IStudent | undefined) => {
              alert('Student created');
            },
            error: (err) => {
              alert('Error creating student');
            },
          });
      }
      this.studentFormGroup.reset();
      this.submitted.emit();
    }
  }
  addStudentToCourse(course: ICourse) {
    if (!!this.student) {
      course.students.push(this.student.id);
      this._coursesService
        .updateCourse(course)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (course: ICourse | undefined) => {
            if (course) {
              alert('Student added to course');
            } else {
              alert('Error adding student to course');
            }
          },
          error: (err) => {
            alert('Error adding student to course');
          },
        });
    }
  }
  removeStudentFromCourse(course: ICourse) {
    if (!!this.student) {
      course.students = course.students.filter(
        (studentId) => studentId !== this.student?.id
      );
      this._coursesService
        .updateCourse(course)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (course: ICourse | undefined) => {
            if (course) {
              alert('Student removed from course');
            } else {
              alert('Error removing student from course');
            }
          },
          error: (err) => {
            alert('Error removing student from course');
          },
        });
    }
  }
}
