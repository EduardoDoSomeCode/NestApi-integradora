import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})

<<<<<<< HEAD
export class PrismaModule {}
=======
export class PrismaModule {}
>>>>>>> 6376f00cdb0aebf197130b7618c532fe2a3b3769
