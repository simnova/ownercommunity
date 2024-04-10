import { RcFile } from 'antd/lib/upload/interface';
import imageCompression from 'browser-image-compression';

const DEFAULT_MAX_FILE_SIZE = 1.2 * 1024 * 1024; // 10 MB

export interface FileValidatorOptions {
  maxFileSizeBytes?: number;
  maxWidthOrHeight?: number;
  permittedContentTypes?: string[];
}

export interface FileValidatorResult {
  success: boolean;
  file?: RcFile;
  message?: string;
  code?: string;
}

export class FileValidator {
  private readonly file: RcFile;
  private readonly maxFileSizeBytes: number;
  private readonly maxWidthOrHeight: number | undefined;
  private readonly permittedContentTypes: string[];

  constructor(file: RcFile, options?: FileValidatorOptions) {
    this.file = file;
    this.maxFileSizeBytes = options?.maxFileSizeBytes ?? DEFAULT_MAX_FILE_SIZE;
    this.maxWidthOrHeight = options?.maxWidthOrHeight;
    this.permittedContentTypes = options?.permittedContentTypes ?? [];
  }

  public async validate(): Promise<FileValidatorResult> {
    let newFile: RcFile = this.file;

    if (!this.validateContentType()) {
      return {
        success: false,
        message: `Invalid content type: ${this.file.type}`,
        code: 'content-type'
      };
    }

    const result = await this.validateContentLength(newFile);

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        code: result.code
      };
    }

    return {
      success: true,
      file: newFile
    };
  }

  private validateContentType(): boolean {
    if (this.permittedContentTypes.length == 0) {
      return true;
    }

    return this.permittedContentTypes.includes(this.file.type);
  }

  private async validateContentLength(newFile: RcFile): Promise<{ success: boolean; message?: string; code?: string }> {
    if (this.file.type.startsWith('image/') && (this.maxWidthOrHeight || this.maxFileSizeBytes)) {
      try {
        await this.compressImage;
      } catch (error) {
        console.error('cannot compress:', error);
        return {
          success: false,
          message: `Cannot compress file: ${error}`,
          code: 'compress'
        };
      }
    }

    if (newFile.size <= this.maxFileSizeBytes) {
      return {
        success: true
      };
    } else {
      return {
        success: false,
        message: `Invalid content length: ${this.file.size}. Max size permitted: ${this.maxFileSizeBytes}`,
        code: 'content-length'
      };
    }
  }

  private async compressImage(): Promise<File> {
    console.log('beforeCompression size:', this.file.size);
    let options: any = {};
    if (this.maxFileSizeBytes) {
      options.maxSizeMB = this.maxFileSizeBytes / 1024 / 1024;
    }
    if (this.maxWidthOrHeight) {
      options.maxWidthOrHeight = this.maxWidthOrHeight;
    }
    console.log('beforeCompression options:', options);
    const uid = this.file.uid;
    const newFile = (await imageCompression(this.file, options)) as RcFile;
    console.log('afterCompression size:', newFile.size);
    this.file.uid = uid;
    return newFile;
  }
}
