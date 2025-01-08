import { Transport } from '@nestjs/microservices';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';

export const emailMicroserviceConfig: ClientProviderOptions = {
  name: 'EMAILS_SERVICE',
  transport: Transport.RMQ,
  options: {
    urls: [
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
    ],
    queue: 'HUBSD_EMAIL_MICROSERVICE',
    queueOptions: {
      durable: true,
    },
  },
};
