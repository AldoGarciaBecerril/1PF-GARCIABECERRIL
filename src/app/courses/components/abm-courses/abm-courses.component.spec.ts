import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCoursesComponent } from './abm-courses.component';
import { CoursesService } from '../../services/courses.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AbmCoursesComponent', () => {
  let component: AbmCoursesComponent;
  let fixture: ComponentFixture<AbmCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmCoursesComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [HttpClient, CoursesService],
    }).compileComponents();

    fixture = TestBed.createComponent(AbmCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
