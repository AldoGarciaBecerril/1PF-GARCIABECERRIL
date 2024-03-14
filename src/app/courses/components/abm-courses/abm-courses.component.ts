import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICourse } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';
import { IStudent } from '../../../students/interface/student.interface';
import { StudentsService } from '../../../students/services/students.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-abm-courses',
  templateUrl: './abm-courses.component.html',
  styleUrl: './abm-courses.component.scss',
})
export class AbmCoursesComponent implements OnInit, OnDestroy {
  @Input() course: ICourse | undefined;
  @Output() submitted: EventEmitter<void> = new EventEmitter<void>();
  courseFormGroup: FormGroup;
  public teachers: IStudent[] = [];
  public students: IStudent[] = [];
  public selectedTeacher: number | undefined;
  /* Utility */
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private formBuilder: FormBuilder,
    private _coursesService: CoursesService,
    private _studentsService: StudentsService
  ) {
    this.courseFormGroup = this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
    });
  }
  ngOnInit(): void {
    if (!!this.course) {
      this.courseFormGroup.patchValue(this.course);
    }
    this.getTeachers();
    this.getStudents();
  }
  ngOnDestroy(): void {
    this.courseFormGroup.reset();
    this._unsubscribeAll.complete();
  }
  getTeachers() {
    this._studentsService
      .getStudentsSubject()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (students: IStudent[]) => {
          console.log(students);
          this.teachers = students.filter((s) => s.role === 'teacher');
          console.log(this.teachers);
        },
        error: (error) => {
          console.error(error);
          this.teachers = [];
        },
      });
  }
  getStudents() {
    this._studentsService
      .getStudentsSubject()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (students: IStudent[]) => {
          this.students = students;
        },
        error: (error) => {
          console.error(error);
          this.students = [];
        },
      });
  }
  manageCourse() {
    if (this.courseFormGroup.invalid) {
      return alert('Form invalid');
    } else {
      let course: ICourse = this.courseFormGroup.value;
      if (!!this.selectedTeacher) {
        course.teacher = this.selectedTeacher;
        if (!!this.course) {
          course.id = this.course.id;
          course.students = this.course.students;
          this._coursesService
            .updateCourse(course)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
              next: (course: ICourse | undefined) => {
                alert('Course updated');
                this.courseFormGroup.reset();
                this.submitted.emit();
              },
              error: (err) => {
                alert('Error updating course');
              },
            });
        } else {
          this._coursesService
            .createCourse(course)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
              next: (course: ICourse | undefined) => {
                alert('Course created');
                this.courseFormGroup.reset();
                this.submitted.emit();
              },
              error: (err) => {
                alert('Error creating course');
              },
            });
        }
      } else {
        alert('Please select a teacher');
      }
    }
  }

  addStudent(studentId: number) {
    if (!!this.course) {
      this.course.students.push(studentId);
      this._coursesService
        .updateCourse(this.course)
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
  removeStudent(studentId: number) {
    if (!!this.course) {
      this.course.students = this.course.students.filter(
        (id) => id !== studentId
      );
      this._coursesService
        .updateCourse(this.course)
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
