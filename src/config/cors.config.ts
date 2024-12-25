import { INestApplication } from '@nestjs/common';

export const corsConfig = (app: INestApplication): void => {
  app.enableCors({
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
    origin: '*',
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
  });
};
