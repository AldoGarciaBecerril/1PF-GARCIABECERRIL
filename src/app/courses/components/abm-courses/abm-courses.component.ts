import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ICourse } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';
import { IStudent } from '../../../students/interface/student.interface';
import { StudentsService } from '../../../students/services/students.service';
@Component({
  selector: 'app-abm-courses',
  templateUrl: './abm-courses.component.html',
  styleUrl: './abm-courses.component.scss',
})
export class AbmCoursesComponent implements OnInit {
  @Input() course: ICourse | undefined;
  @Output() submitted: EventEmitter<void> = new EventEmitter<void>();
  courseFormGroup: FormGroup;
  public teachers: IStudent[] = [];
  public students: IStudent[] = [];
  public selectedTeacher: number | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private _coursesService: CoursesService,
    private _studentsService: StudentsService
  ) {
    this.courseFormGroup = this.formBuilder.group({
      title: this.formBuilder.control(''),
    });
  }
  ngOnInit(): void {
    if (!!this.course) {
      this.courseFormGroup.patchValue(this.course);
    }
    this.getTeachers();
    this.getStudents();
  }
  getTeachers() {
    this._studentsService.getStudentsSubject().subscribe({
      next: (students: IStudent[]) => {
        this.teachers = students.filter((s) => s.role === 'teacher');
      },
      error: (error) => {
        console.error(error);
        this.teachers = [];
      },
    });
  }
  getStudents() {
    this._studentsService.getStudentsSubject().subscribe({
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
    let course: ICourse = this.courseFormGroup.value;
    if (!!this.selectedTeacher) {
      course.teacher = this.selectedTeacher;
      if (!!this.course) {
        course.id = this.course.id;
        course.students = this.course.students;
        this._coursesService.updateCourse(course);
      } else {
        this._coursesService.createCourse(course);
      }
      this.courseFormGroup.reset();
      this.submitted.emit();
    } else {
      alert('Please select a teacher');
    }
  }

  addStudent(studentId: number) {
    if (!!this.course) {
      this.course.students.push(studentId);
      this._coursesService.updateCourse(this.course);
    }
  }
  removeStudent(studentId: number) {
    if (!!this.course) {
      this.course.students = this.course.students.filter(
        (id) => id !== studentId
      );
      this._coursesService.updateCourse(this.course);
    }
  }
}
