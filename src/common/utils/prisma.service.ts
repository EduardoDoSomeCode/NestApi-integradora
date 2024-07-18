import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  
<<<<<<< HEAD
}
=======
}
>>>>>>> 6376f00cdb0aebf197130b7618c532fe2a3b3769
