import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const MulterConfig = MulterModule.registerAsync({
  useFactory: () => ({
    storage: diskStorage({
      destination: `${process.env.APP_STORAGE}/public`,
      filename: (_req: any, file, cb) => {
        cb(null, `${Date.now()}${extname(file.originalname)}`);
      },
    }),
  }),
});
