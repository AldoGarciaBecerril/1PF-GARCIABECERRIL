import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes-exercise',
  templateUrl: './pipes-exercise.component.html',
  styleUrl: './pipes-exercise.component.scss',
})
export class PipesExerciseComponent {
  today = new Date();
  price = 9000000;
}
