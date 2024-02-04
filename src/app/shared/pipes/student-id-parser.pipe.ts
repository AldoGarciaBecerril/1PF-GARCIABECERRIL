import { Pipe, PipeTransform } from '@angular/core';
import { IStudent } from '../../students/interface/student.interface';
import { StudentsService } from '../../students/services/students.service';

@Pipe({
  name: 'studentIdParser',
})
export class StudentIdParserPipe implements PipeTransform {
  constructor(private _studentsService: StudentsService) {}
  transform(id: number, ...args: unknown[]): IStudent | undefined {
    return this._studentsService.getStudent(id);
  }
}
