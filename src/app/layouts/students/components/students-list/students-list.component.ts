import { Component } from '@angular/core';
import { Student } from '../../interface/student.interface';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent {
  displayedColumns: string[] = ['id', 'first', 'second', 'last', 'age', ];
  dataSource:Student[]=[
    {
      id:1,
      firstName:"Raul",
      lastName:"Rojo",
      age:19
    },
    {
      id:2,
      firstName:"Jose Luis",
      lastName:"Cacharganas",
      age:23
    },
    {
      id:3,
      firstName:"Juan",
      lastName:"Perez",
      age:25
    },
    {
      id:4,
      firstName:"Rafael",
      lastName:"Novoa",
      age:27
    },
    {
      id:5,
      firstName:"Raul",
      lastName:"Gomez",
      age:32
    },
    {
      id:6,
      firstName:"Romina",
      lastName:"Alcala",
      age:20
    },
    {
      id:7,
      firstName:"Jessica",
      lastName:"Mondragon",
      age:19
    },
    {
      id:8,
      firstName:"Paloma",
      lastName:"Aguirre",
      age:24
    },
    {
      id:9,
      firstName:"Alondra",
      lastName:"Cruz",
      age:29
    },
    {
      id:10,
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
