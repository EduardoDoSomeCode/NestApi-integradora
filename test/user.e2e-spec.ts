import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { UsersService } from 'src/modules/users/users.service';
import { UsersController } from 'src/modules/users/users.controller';
import { PrismaService } from 'src/prisma.services';

type MockedPrismaService = {
    user: {
      create: jest.Mock<any, any>;
      findMany: jest.Mock<any, any>;
      // otros métodos que necesites mockear
    };
};
  

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let prisma: MockedPrismaService;

  beforeEach(async () => {
    // Mock manual del PrismaService
    const prismaMock: MockedPrismaService = {
        user: {
          create: jest.fn(),
          findMany: jest.fn(),
          // otros métodos que necesites mockear
        },
      };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService) as unknown as MockedPrismaService;
  });

  it('should create a user', async () => {
    const mockUser = {
      id: 1,
      name: "Eduardo",
      email: "Edd@itISCool@gmail.com",
      password: "TheBett3rt_thang",
      ItHasIntegration: false,
    };

    prisma.user.create.mockResolvedValueOnce(mockUser);

    const result = await controller.postNewUser({
        name: "Eduardo",
        email: "Edd@itISCool@gmail.com",
        password: "TheBett3rt_thang",
        ItHasIntegration: false,
        IdUser: 0n
    });

    expect(result).toEqual(mockUser);
  });
});
