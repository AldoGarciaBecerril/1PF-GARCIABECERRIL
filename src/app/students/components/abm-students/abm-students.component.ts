import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IStudent } from '../../interface/student.interface';
import { StudentsService } from '../../services/students.service';
import { ICourse } from '../../../courses/interfaces/course.interface';
import { CoursesService } from '../../../courses/services/courses.service';

@Component({
  selector: 'app-abm-students',
  templateUrl: './abm-students.component.html',
  styleUrl: './abm-students.component.scss',
})
export class ABMStudentsComponent implements OnInit {
  @Input() student: IStudent | undefined;
  @Output() submitted: EventEmitter<void> = new EventEmitter<void>();
  public studentFormGroup: FormGroup;
  public courses: ICourse[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private _studentsService: StudentsService,
    private _coursesService: CoursesService
  ) {
    this.studentFormGroup = this.formBuilder.group({
      firstName: this.formBuilder.control(''),
      lastName: this.formBuilder.control(''),
      age: this.formBuilder.control(0),
      email: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
      role: this.formBuilder.control('user'),
    });
  }
  ngOnInit(): void {
    if (!!this.student) {
      this.studentFormGroup.patchValue(this.student);
    }
    this.getCourses();
  }
  getCourses() {
    this._coursesService.getCoursesSubject().subscribe({
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
    let student: IStudent = this.studentFormGroup.value;
    if (!!this.student) {
      student.id = this.student.id;
      this._studentsService.updateStudent(student);
    } else {
      this._studentsService.createStudent(student);
    }
    this.studentFormGroup.reset();
    this.submitted.emit();
  }
  addStudentToCourse(course: ICourse) {
    if (!!this.student) {
      course.students.push(this.student.id);
      this._coursesService.updateCourse(course);
    }
  }
  removeStudentFromCourse(course: ICourse) {
    if (!!this.student) {
      course.students = course.students.filter(
        (studentId) => studentId !== this.student?.id
      );
      this._coursesService.updateCourse(course);
    }
  }
}
