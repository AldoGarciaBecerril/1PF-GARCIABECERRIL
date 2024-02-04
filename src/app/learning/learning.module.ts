import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Components */
import { PipesExerciseComponent } from './components/pipes-exercise/pipes-exercise.component';

@NgModule({
  declarations: [PipesExerciseComponent],
  imports: [CommonModule],
  exports: [PipesExerciseComponent],
})
export class LearningModule {}
