import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABMStudentsComponent } from './abm-students.component';

describe('ABMStudentsComponent', () => {
  let component: ABMStudentsComponent;
  let fixture: ComponentFixture<ABMStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ABMStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ABMStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
