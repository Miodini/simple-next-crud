import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ExpressAdapter, type NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './modules/app.module'

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

export async function createApp(adapter: ExpressAdapter): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, adapter)

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      origin: 'http://localhost:3000'
    })
  }

  buildSwagger(app)
  return app
}
