import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCoursesComponent } from './abm-courses.component';

describe('AbmCoursesComponent', () => {
  let component: AbmCoursesComponent;
  let fixture: ComponentFixture<AbmCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbmCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
