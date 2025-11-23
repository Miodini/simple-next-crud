import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from './generated/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // NOTE: there seems to not be a MySQL adapter, thus the database connection is currently broken
    // Replace this with Postgre once implemented and remove the MariaDB package
    const adapter = new PrismaMariaDb({
      host: 'localhost',
      port: 3306,
      connectionLimit: 5
    })
    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()
  }
}
