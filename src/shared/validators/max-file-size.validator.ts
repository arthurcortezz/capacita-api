import { FileValidator } from '@nestjs/common';

export class MaxFileSizeValidator extends FileValidator<{ maxSize: number }> {
  constructor(options: { maxSize: number }) {
    super(options);
  }

  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    const in_mb = file.size / 1000000;
    return in_mb <= this.validationOptions.maxSize;
  }
  buildErrorMessage(): string {
    return `O tamanho do arquivo excede o limite de (${this.validationOptions.maxSize} MB)`;
  }
}
