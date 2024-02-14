import { Pipe, PipeTransform } from '@angular/core';
/* RxJs */
import { firstValueFrom } from 'rxjs';
/* Interfaces */
import { IStudent } from '../../students/interface/student.interface';
/* Services */
import { StudentsService } from '../../students/services/students.service';

@Pipe({
  name: 'studentIdParser',
})
export class StudentIdParserPipe implements PipeTransform {
  constructor(private _studentsService: StudentsService) {}
  async transform(
    id: number,
    ...args: unknown[]
  ): Promise<IStudent | undefined> {
    console.log(id);
    setTimeout(() => {
      this._studentsService.rechargeStudents();
    }, 10);
    let students: IStudent[] = await firstValueFrom(
      this._studentsService.students$
    );
    console.log(students);
    if (students.length >= 0) {
      let student: IStudent | undefined;
      student = students.find((student: IStudent) => {
        return student.id === id;
      });
      return student;
    } else {
      return undefined;
    }
  }
}
