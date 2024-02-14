import { StudentIdParserPipe } from './student-id-parser.pipe';
import { StudentsService } from '../../students/services/students.service';

describe('StudentIdParserPipe', () => {
  it('create an instance', () => {
    const studentsServiceMock = jasmine.createSpyObj('StudentsService', [
      'getStudent',
    ]);
    const pipe = new StudentIdParserPipe(
      studentsServiceMock as StudentsService
    );
    expect(pipe).toBeTruthy();
  });
});
