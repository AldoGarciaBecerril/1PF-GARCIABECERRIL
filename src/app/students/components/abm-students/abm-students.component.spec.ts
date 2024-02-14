import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABMStudentsComponent } from './abm-students.component';
import { StudentsService } from '../../../students/services/students.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ABMStudentsComponent', () => {
  let component: ABMStudentsComponent;
  let fixture: ComponentFixture<ABMStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ABMStudentsComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [StudentsService, HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(ABMStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
