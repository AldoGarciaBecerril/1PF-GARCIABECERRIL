import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Student } from '../../interface/student.interface';

@Component({
  selector: 'app-abm-students',
  templateUrl: './abm-students.component.html',
  styleUrl: './abm-students.component.scss'
})
export class ABMStudentsComponent {
  @Output()
studentSubmited = new EventEmitter();

studentFormGroup:FormGroup
constructor(private formBuilder: FormBuilder){
  this.studentFormGroup = this.formBuilder.group({
    firstName:this.formBuilder.control(""),
    lastName:this.formBuilder.control(""),
    age:this.formBuilder.control(0)
  })
}
addStudent(){
  this.studentSubmited.emit(this.studentFormGroup.value)
} 
}
