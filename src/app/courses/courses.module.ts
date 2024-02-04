import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../shared/shared.module';
/* Components */
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { AbmCoursesComponent } from './components/abm-courses/abm-courses.component';

@NgModule({
  declarations: [CoursesListComponent, AbmCoursesComponent],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
})
export class CoursesModule {}
