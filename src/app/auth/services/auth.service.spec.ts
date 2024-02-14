import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IStudent } from '../../students/interface/student.interface';
const testUser: IStudent | undefined = {
  id: 1,
  firstName: 'Test',
  lastName: 'Test',
  email: 'test@test.test',
  password: 'password',
  role: 'user',
  age: 20,
};

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login successfully', () => {
    const mockStudent: IStudent = {
      id: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.test',
      password: 'password',
      role: 'user',
      age: 20,
    };
    const email = 'test@test.test';
    const password = 'password';

    authService.login(email, password).subscribe((student) => {
      expect(student).toEqual(mockStudent);
    });

    const req = httpMock.expectOne(
      'https://65cbf480efec34d9ed884d34.mockapi.io/student'
    );
    expect(req.request.method).toBe('GET');

    req.flush([mockStudent]);
    httpMock.verify();
  });

  it('should save identity', () => {
    const mockStudent: IStudent = {
      id: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.test',
      password: 'password',
      role: 'user',
      age: 20,
    };

    authService.saveIdentity(mockStudent);

    expect(authService.identity).toEqual(mockStudent);
    authService.identity$.subscribe((identity) => {
      expect(identity).toEqual(mockStudent);
    });
  });

  it('should get identity', () => {
    const mockStudent: IStudent = {
      id: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.test',
      password: 'password',
      role: 'user',
      age: 20,
    };
    authService.identity = mockStudent;

    const identity = authService.getIdentity();

    expect(identity).toEqual(mockStudent);
  });

  it('should remove identity', () => {
    const mockStudent: IStudent = {
      id: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.test',
      password: 'password',
      role: 'user',
      age: 20,
    };
    authService.identity = mockStudent;

    authService.removeIdentity();

    expect(authService.identity).toBeUndefined();
    authService.identity$.subscribe((identity) => {
      expect(identity).toBeUndefined();
    });
  });
});
