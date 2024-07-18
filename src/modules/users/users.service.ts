import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/utils/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findOne(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { IdUser: Number(userId) },
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.prisma.user.delete({
      where: { IdUser: Number(userId) },
    });
  }

  async postNewUser(newUser: Omit<User, 'IdUser'>): Promise<any> {
    if (newUser.email.length > 255) {
      throw new BadRequestException('Email is too long');
    }

    // Validar longitud de otros campos si es necesario
    if (newUser.name && newUser.name.length > 100) {
      throw new BadRequestException('Name is too long');
    }

    const user = await this.prisma.user.create({
      data: newUser,
    });

    // Convertir BigInt a string y tomar los primeros 3 números
    return this.sanitizeUser(user);


  }
  private sanitizeUser(user: User) {
    return {
      ...user,
      IdUser: user.IdUser.toString().slice(0, 3),
    };
  }

}
export { User };

