import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { ABMStudentsComponent } from './components/abm-students/abm-students.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ABMStudentsComponent, StudentsListComponent],
  imports: [CommonModule, StudentsRoutingModule, SharedModule],
  exports: [StudentsListComponent, ABMStudentsComponent],
})
export class StudentsModule {}
