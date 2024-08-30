import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { PrismaModule } from 'src/common/utils/prisma.module';
import { PrismaService } from 'src/prisma.services';

@Module({
  providers: [QuotesService,PrismaService],
  exports:[QuotesService],
  controllers: [QuotesController],

})
export class QuotesModule {}
