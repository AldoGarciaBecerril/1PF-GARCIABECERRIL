import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ABMStudentsComponent } from './components/abm-students/abm-students.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ABMStudentsComponent,
    StudentsListComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    SharedModule
  ],
  exports: [
    StudentsListComponent,
    ABMStudentsComponent
  ]

})
export class StudentsModule { }
