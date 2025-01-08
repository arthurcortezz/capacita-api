import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import {
  MicroserviceOptions,
  Transport,
} from "@nestjs/microservices";

import * as morgan from "morgan";
import * as compression from "compression";
import { AppModule } from "./app/app.module";
import * as cookieParser from "cookie-parser";
import { GLOBAL_API_PREFIX } from "./constants/contants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
      ],
      queue: "IMPORT_PDF_QUEUE_MICROSERVICE",
      queueOptions: {
        durable: false,
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      validationError: { target: false },
      whitelist: true,
    })
  );
  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.use(cookieParser(process.env.APP_SECRET));

  app.use(compression());
  app.use(morgan("combined"));

  await app.startAllMicroservices();
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Capacita")
    .setDescription("Capacita API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      docExpansion: "none",
      filter: true,
      displayRequestDuration: true,
    },
  });
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(
      `Listening at http://localhost:${process.env.APP_PORT}/${GLOBAL_API_PREFIX}`
    );
  });
}
bootstrap();
