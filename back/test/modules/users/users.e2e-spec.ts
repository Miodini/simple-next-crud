import request from 'supertest'
import { Test } from '@nestjs/testing'
import { ValidationPipe, type INestApplication } from '@nestjs/common'
import { PrismaService } from '@/modules/prisma/prisma.service'
import { AuthGuard } from '@/modules/auth/auth.guard'
import { UsersModule } from '@/modules/users/users.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { PrismaModule } from '@/modules/prisma/prisma.module'
import { account } from '../auth/__mocks__/account.mock'
import { users } from './__mocks__/users.mock'
import { AuthGuardMock } from '../auth/__mocks__/auth.guard.mock'
import type { GetUserDto, CreateUserDto, UpdateUserDto } from '@/modules/users/users.dto'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const createGetUserMatcher = (user: CreateUserDto) => expect.objectContaining<GetUserDto>({
  id: expect.any(Number) as number,
  ...user
})

describe('Users', () => {
  let app: INestApplication
  let prismaService: PrismaService

  beforeAll(async () => {
    // Initializes Nest application
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule, PrismaModule, UsersModule]
    })
      .overrideGuard(AuthGuard)
      .useClass(AuthGuardMock)
      .compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()

    prismaService = app.get(PrismaService)
    await prismaService.account.deleteMany()
    await prismaService.account.create({ data: account })
  })

  beforeEach(async () => {
    // Ensure the DB Table is empty before each test
    await prismaService.user.deleteMany()
  })

  describe('/GET users', () => {
    it('should find no users', async () => {
      await request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect([])
    })

    it('should get all users', async () => {
      await prismaService.user.createMany({ data: users })
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200)

      expect(response.body[0]).toEqual(createGetUserMatcher(users[0]))
      expect(response.body[1]).toEqual(createGetUserMatcher(users[1]))
    })
  })

  describe('/GET users/:id', () => {
    it('should get a single user', async () => {
      const newUser = await prismaService.user.create({ data: users[0] })

      const response = await request(app.getHttpServer())
        .get(`/users/${newUser.id}`)
        .expect(200)

      expect(response.body).toEqual(createGetUserMatcher(users[0]))
    })

    it('should not find a user', async () => {
      const newUser = await prismaService.user.create({ data: users[0] })

      await request(app.getHttpServer())
        .get(`/users/${newUser.id + 1}`)
        .expect(404)
    })
  })

  describe('/POST users', () => {
    it('should create a new user', async () => {
      const newUser: CreateUserDto = {
        name: 'Rin Hoshizora',
        email: 'rin@email.com',
        phone: '1283392',
        gender: 'F'
      }
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(201)

      expect(response.body).toEqual(createGetUserMatcher(newUser))
    })

    it('should fail to create a user with invalid name', async () => {
      const newUser: CreateUserDto = {
        name: '',
        email: 'rin@email.com',
        phone: '1283392',
        gender: 'F'
      }
      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(400)
    })

    it('should fail to create a user with invalid email', async () => {
      const newUser: CreateUserDto = {
        name: 'Rin Hoshizora',
        email: '',
        phone: '1283392',
        gender: 'F'
      }
      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(400)

      newUser.email = 'not an email'
      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(400)

      const insertedUser = await prismaService.user.create({ data: users[0] })
      newUser.email = insertedUser.email // Duplicate e-mail
      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(400)
    })

    it('should fail to create a user with invalid phone', async () => {
      const newUser: CreateUserDto = {
        name: 'Rin Hoshizora',
        email: 'rin@email.com',
        phone: '',
        gender: 'F'
      }
      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(400)

      newUser.phone = 'not a phone number'
      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(400)
    })

    it('should fail to create a user with invalid gender', async () => {
      const newUser: Omit<CreateUserDto, 'gender'> & { gender: string } = {
        name: 'Rin Hoshizora',
        email: 'rin@email.com',
        phone: '1283392',
        gender: ''
      }
      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(400)

      newUser.gender = 'A'
      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(400)
    })
  })

  describe('/PUT users/:id', () => {
    it('should update an existing user', async () => {
      const updatedUserInfo: Required<UpdateUserDto> = {
        name: 'Rin Hoshizora',
        email: 'rin@email.com',
        phone: '1283392',
        gender: 'F'
      }
      const newUser = await prismaService.user.create({ data: users[0] })

      await request(app.getHttpServer())
        .put(`/users/${newUser.id}`)
        .send(updatedUserInfo)
        .expect(200)

      await expect(prismaService.user.findUnique({ where: { id: newUser.id } }))
        .resolves
        .toEqual(createGetUserMatcher(updatedUserInfo))
    })

    it('should fail to update a non existing user', async () => {
      const updatedUserInfo: UpdateUserDto = {
        name: 'Rin Hoshizora',
        email: 'rin@email.com',
        phone: '1283392',
        gender: 'F'
      }
      const newUser = await prismaService.user.create({ data: users[0] })

      await request(app.getHttpServer())
        .put(`/users/${newUser.id + 1}`)
        .send(updatedUserInfo)
        .expect(404)

      await expect(prismaService.user.findUnique({ where: { id: newUser.id } }))
        .resolves
        .toEqual(createGetUserMatcher(newUser))
    })

    it('should fail to update a user with invalid name', async () => {
      const updatedUserInfo: UpdateUserDto = {
        name: ''
      }
      const newUser = await prismaService.user.create({ data: users[0] })

      await request(app.getHttpServer())
        .put(`/users/${newUser.id}`)
        .send(updatedUserInfo)
        .expect(400)
      await expect(prismaService.user.findUnique({ where: { id: newUser.id } }))
        .resolves
        .toEqual(createGetUserMatcher(newUser))
    })

    it('should fail to update a user with invalid email', async () => {
      const updatedUserInfo: UpdateUserDto = {
        email: ''
      }
      const newUser = await prismaService.user.create({ data: users[0] })

      await request(app.getHttpServer())
        .put(`/users/${newUser.id}`)
        .send(updatedUserInfo)
        .expect(400)

      updatedUserInfo.email = 'not an email'
      await request(app.getHttpServer())
        .put(`/users/${newUser.id}`)
        .send(updatedUserInfo)
        .expect(400)

      updatedUserInfo.email = newUser.email // Duplicate e-mail
      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(400)

      await expect(prismaService.user.findUnique({ where: { id: newUser.id } }))
        .resolves
        .toEqual(createGetUserMatcher(newUser))
    })

    it('should fail to update a user with invalid phone', async () => {
      const updatedUserInfo: UpdateUserDto = {
        phone: ''
      }
      const newUser = await prismaService.user.create({ data: users[0] })

      await request(app.getHttpServer())
        .put(`/users/${newUser.id}`)
        .send(updatedUserInfo)
        .expect(400)

      updatedUserInfo.phone = 'not a phone number'
      await request(app.getHttpServer())
        .put(`/users/${newUser.id}`)
        .send(updatedUserInfo)
        .expect(400)

      await expect(prismaService.user.findUnique({ where: { id: newUser.id } }))
        .resolves
        .toEqual(createGetUserMatcher(newUser))
    })

    it('should fail to update a user with invalid gender', async () => {
      const updatedUserInfo: Omit<UpdateUserDto, 'gender'> & { gender: string } = {
        gender: ''
      }
      const newUser = await prismaService.user.create({ data: users[0] })

      await request(app.getHttpServer())
        .put(`/users/${newUser.id}`)
        .send(updatedUserInfo)
        .expect(400)

      updatedUserInfo.gender = 'A'
      await request(app.getHttpServer())
        .put(`/users/${newUser.id}`)
        .send(updatedUserInfo)
        .expect(400)

      await expect(prismaService.user.findUnique({ where: { id: newUser.id } }))
        .resolves
        .toEqual(createGetUserMatcher(newUser))
    })
  })

  describe('/DELETE users/:id', () => {
    it('should delete a user', async () => {
      const newUser = await prismaService.user.create({ data: users[0] })

      await request(app.getHttpServer())
        .delete(`/users/${newUser.id}`)
        .expect(200)

      await expect(prismaService.user.findUnique({ where: { id: newUser.id } }))
        .resolves
        .toBeNull()
    })

    it('should fail to delete a non existing user', async () => {
      const newUser = await prismaService.user.create({ data: users[0] })

      await request(app.getHttpServer())
        .delete(`/users/${newUser.id + 1}`)
        .expect(404)

      // No users should be deleted
      await expect(prismaService.user.findUnique({ where: { id: newUser.id } }))
        .resolves
        .toEqual(createGetUserMatcher(newUser))
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
