import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

function buildSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Users')
    .setDescription('Users registration')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, documentFactory)
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      origin: 'http://localhost:3000'
    })
  }

  buildSwagger(app)
  await app.listen(process.env.PORT ?? 3001)
}
void bootstrap()
