import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Components */
import { CoursesListComponent } from './components/courses-list/courses-list.component';
const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
