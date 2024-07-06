import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { PrismaModule } from '../../common/utils/prisma.module';
7
@Module({
  imports: [PrismaModule],
  providers: [HabitsService],
  controllers: [HabitsController],
})
export class HabitsModule {}

