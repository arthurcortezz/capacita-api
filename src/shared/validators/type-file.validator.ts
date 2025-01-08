import { FileValidator } from '@nestjs/common';
import * as mime from 'mime-types';

export class TypeFileValidator extends FileValidator<{ mimeTypes: string[] }> {
  constructor(options: { mimeTypes: string[] }) {
    super(options);
  }

  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    const mimeType = mime.lookup(file.originalname);
    if (this.validationOptions.mimeTypes.includes(mimeType)) {
      return true;
    }

    return false;
  }
  buildErrorMessage(): string {
    return `Apenas arquivos (${this.validationOptions.mimeTypes.join(
      ', ',
    )}) são permitidos.`;
  }
}
