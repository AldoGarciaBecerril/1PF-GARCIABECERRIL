import { Component } from '@angular/core';

export interface IMyRoutes {
  path: string;
  title: string;
}
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  public myRoutes: IMyRoutes[] = [
    {
      path: '/students',
      title: 'Students',
    },
    {
      path: '/courses',
      title: 'Courses',
    },
    {
      path: '/',
      title: 'Home',
    },
  ];
}
