import { render, screen } from '@testing-library/react';
import { FileValidator } from './file-validator';
import { RcFile } from 'antd/es/upload';

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

    it(
      'should pass validation for correct file type',
      async () => {
        //Arrange
        const file = new File(['test file'], 'filename.jpeg', { type: 'text/csv' }) as RcFile;
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
      },
      { timeout: 10000 }
    );

    it(
      'should pass validation for meeting size limitations',
      async () => {
        //Arrange
        const file = new File(['test file'], 'filename.jpeg', { type: 'text/csv' }) as RcFile;
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
        const file = new File(['test file test'], 'filename.jpeg', { type: 'text/csv' }) as RcFile;
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
