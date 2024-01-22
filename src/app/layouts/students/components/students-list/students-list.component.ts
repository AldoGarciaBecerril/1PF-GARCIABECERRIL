import { Component } from '@angular/core';
import { Student } from '../../interface/student.interface';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent {
  displayedColumns: string[] = ['first', 'last', 'age', ];
  dataSource:Student[]=[
    {
      firstName:"Raul",
      lastName:"Rojo",
      age:19
    },
    {
      firstName:"Jose Luis",
      lastName:"Cacharganas",
      age:23
    }
  ];
  constructor(){
  }
  onStudentSubmited(ev:Student){
    this.dataSource = [...this.dataSource,ev]
  }
}
