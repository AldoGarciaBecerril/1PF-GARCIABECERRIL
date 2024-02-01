import { Component } from '@angular/core';
import { Student } from '../../interface/student.interface';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent {
  displayedColumns: string[] = ['first', 'second', 'last', 'age', ];
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
    },
    {
      firstName:"Juan",
      lastName:"Perez",
      age:25
    },
    {
      firstName:"Rafael",
      lastName:"Novoa",
      age:27
    },
    {
      firstName:"Raul",
      lastName:"Gomez",
      age:32
    },
    {
      firstName:"Romina",
      lastName:"Alcala",
      age:20
    },
    {
      firstName:"Jessica",
      lastName:"Mondragon",
      age:19
    },
    {
      firstName:"Paloma",
      lastName:"Aguirre",
      age:24
    },
    {
      firstName:"Alondra",
      lastName:"Cruz",
      age:29
    },
    {
      firstName:"Debora",
      lastName:"Melcacho",
      age:18
    }
  ];
  constructor(){
  }
  onStudentSubmited(ev:Student){
    this.dataSource = [...this.dataSource,ev]
  }
}
