import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/utils/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { IdUser:Number(userId) },
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.prisma.user.delete({
      where: { IdUser:Number(userId) },
    });
  }

  async postNewUser(newUser: Omit<User, 'IdUser'>):Promise<User> {
    return this.prisma.user.create({
      data: newUser,
    });

  }

}
export { User };

