import { StudentIdParserPipe } from './student-id-parser.pipe';

describe('StudentIdParserPipe', () => {
  it('create an instance', () => {
    const pipe = new StudentIdParserPipe();
    expect(pipe).toBeTruthy();
  });
});
