import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesExerciseComponent } from './pipes-exercise.component';

describe('PipesExerciseComponent', () => {
  let component: PipesExerciseComponent;
  let fixture: ComponentFixture<PipesExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipesExerciseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PipesExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
