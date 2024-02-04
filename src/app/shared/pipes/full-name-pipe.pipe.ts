import { Pipe, PipeTransform } from '@angular/core';
import { IStudent } from '../../students/interface/student.interface';

@Pipe({
  name: 'fullNamePipe',
})
export class FullNamePipePipe implements PipeTransform {
  transform(value: IStudent | undefined, ...args: unknown[]): string {
    if (value) {
      return value.firstName + ' ' + value.lastName;
    } else {
      return '';
    }
  }
}
