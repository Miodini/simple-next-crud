import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { AuthGuard } from './auth/auth.guard'

function buildSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Users')
    .setDescription('Users registration')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, documentFactory)
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalGuards(new AuthGuard())
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
