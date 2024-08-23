import { Module } from '@nestjs/common';
import { MultimediaService } from './multimedias.service';
import { MultimediasController } from './multimedias.controller';
import { PrismaModule } from '../../common/utils/prisma.module';
import { PrismaService } from '../../common/utils/prisma.service';


@Module({
  imports: [PrismaModule], 
  controllers: [MultimediasController],
  providers: [MultimediaService, PrismaService],
})
export class MultimediasModule {}
