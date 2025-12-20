// Vercel handler
import { ExpressAdapter, type NestExpressApplication } from '@nestjs/platform-express'
import express from 'express'
import type { Request, Response } from 'express'
import { createApp } from '../src/main'

const server = express()
let nestApp: NestExpressApplication

export default async function handler(req: Request, res: Response) {
  if (!nestApp) {
    nestApp = await createApp(new ExpressAdapter(server))

    await nestApp.init()
  }

  server(req, res)
}
