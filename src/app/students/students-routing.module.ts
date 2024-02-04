import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Components */
import { StudentsListComponent } from './components/students-list/students-list.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
