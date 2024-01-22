import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../layouts/students/interface/student.interface';

@Pipe({
  name: 'fullNamePipe'
})
export class FullNamePipePipe implements PipeTransform {

  transform(value: Student, ...args: unknown[]): unknown {
    if(value){
      return value.firstName +' '+ value.lastName;
      }
      return value
    }
  }


