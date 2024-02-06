import { FileValidator } from './file-validator';
import { RcFile } from 'antd/es/upload';
import * as ImageCompression from 'browser-image-compression';

const mockedFile = new File(['()()'], 'filename.jpeg', { type: 'image/png' }) as RcFile;

const getMockedFile = async (file: File): Promise<File> => {
  console.log("filename = ", file.name);
  return mockedFile;
};

vi.mock('browser-image-compression', async (importOriginal) => {
  return {
    ...importOriginal,
    default: vi.fn()
  };
});

vi.mocked(ImageCompression).default.mockImplementation(getMockedFile);

describe('file-validator', () => {
  describe('validate', () => {
    it('should fail validation for wrong file type', async () => {
      //Arrange
      const file = new File(['test file'], 'filename.tsx') as RcFile;
      const validatorOptions = {
        maxFileSizeBytes: 10 * 1024 * 1024,
        maxWidthOrHeight: 2048,
        permittedContentTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'text/plain',
          'text/csv',
          'application/json',
          'application/pdf'
        ]
      };

      //Act
      const validator = new FileValidator(file, validatorOptions);
      const result = await validator.validate();
      //Assert
      expect(result.success).toBe(false);
    });

    it('should pass validation for correct file type of image/png', async () => {
      //Arrange

      const file = new File(['test file'], 'filename.png', { type: 'image/png' }) as RcFile;

      const validatorOptions = {
        maxFileSizeBytes: 10 * 1024 * 1024,
        maxWidthOrHeight: 2048,
        permittedContentTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'text/plain',
          'text/csv',
          'application/json',
          'application/pdf'
        ]
      };

      //Act
      const validator = new FileValidator(file, validatorOptions);
      const result = await validator.validate();

      //Assert
      expect(result.success).toBe(true);
    });

    it(
      'should pass validation for meeting size limitations',
      async () => {
        //Arrange
        const file = new File(['test file'], 'filename.csv', { type: 'text/csv' }) as RcFile;
        const validatorOptions = {
          maxFileSizeBytes: 10,
          maxWidthOrHeight: 2048,
          permittedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'text/plain',
            'text/csv',
            'application/json',
            'application/pdf'
          ]
        };

        //Act
        const validator = new FileValidator(file, validatorOptions);
        const result = await validator.validate();
        //Assert
        expect(result.success).toBe(true);
      },
      { timeout: 10000 }
    );

    it(
      'should fail validation for not meeting size limitations',
      async () => {
        //Arrange
        const file = new File(['test file test'], 'filename2.csv', { type: 'text/csv' }) as RcFile;
        const validatorOptions = {
          maxFileSizeBytes: 10,
          maxWidthOrHeight: 2048,
          permittedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'text/plain',
            'text/csv',
            'application/json',
            'application/pdf'
          ]
        };

        //Act
        const validator = new FileValidator(file, validatorOptions);
        const result = await validator.validate();
        //Assert
        expect(result.success).toBe(false);
      },
      { timeout: 10000 }
    );
  });
});
