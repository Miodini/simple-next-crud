// Dev mode entry file
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'
import { createApp } from '../src/create-app'

async function bootstrap() {
  const server = express()
  const nestApp = await createApp(new ExpressAdapter(server))

  await nestApp.listen(process.env.PORT || 3001)
}

void bootstrap()
