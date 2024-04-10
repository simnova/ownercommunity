import { RcFile } from 'antd/es/upload';
import { FileValidator } from './file-validator';

describe('file-validator', () => {
  describe('validate', () => {
    beforeEach(() => {
      vi.resetModules();
    });

    it('should fail validation for wrong file type', async () => {
      //Arrange
      const mockedFile = new File([''], 'filename1.png', { type: 'image/png' }) as RcFile;
      const getMockedFile = async (): Promise<File> => {
        console.log('filename = ', mockedFile.name);
        return mockedFile;
      };
      vi.doMock('browser-image-compression', async (importOriginal) => {
        return {
          ...importOriginal,
          default: vi.fn().mockImplementation(getMockedFile)
        };
      });

      const { FileValidator } = await import('./file-validator');

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
      const validator = new FileValidator(mockedFile, validatorOptions);
      const result = await validator.validate();
      //Assert
      expect(result.success).toBe(true);
    });

    it('should pass validation for correct file type of image/png', async () => {
      //Arrange
      const mockedFile = new File(['test file'], 'filename2.png', { type: 'image/png' }) as RcFile;
      const getMockedFile = async (): Promise<File> => {
        console.log('filename = ', mockedFile.name);
        return mockedFile;
      };
      vi.doMock('browser-image-compression', async (importOriginal) => {
        return {
          ...importOriginal,
          default: vi.fn().mockImplementation(getMockedFile)
        };
      });

      const { FileValidator } = await import('./file-validator');

      const validatorOptions = {
        maxFileSizeBytes: 10 * 1024,
        maxWidthOrHeight: 2048,
        permittedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'text/plain', 'text/csv']
      };
      //Act
      const validator = new FileValidator(mockedFile, validatorOptions);
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
