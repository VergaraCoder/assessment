import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FilterError } from './common/errors/filter/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { SeederRole } from './common/db/seeders/seeder.role';
import * as cookie from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FilterError());
  const configJwt = app.get(ConfigService);
  const dataSource= app.get(DataSource);
  const seederRole= new SeederRole();

  await seederRole.run(dataSource);

  app.use(cookie(configJwt.get('SIGNED_COOKIE')));

  app.enableCors({
    origin: '*', 
    credentials: true, 
  });

  const config = new DocumentBuilder()
    .setTitle('MEDICAL APPOINTMENTS')
    .setDescription('MEDICAL APPOINTMENTS')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
