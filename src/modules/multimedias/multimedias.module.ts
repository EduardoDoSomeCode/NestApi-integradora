import { Module } from '@nestjs/common';
import { MultimediaService } from './multimedias.service';
import { MultimediasController } from './multimedias.controller';
import { PrismaModule } from 'src/common/utils/prisma.module';
import { PrismaService } from 'src/prisma.services';


@Module({
  imports: [PrismaModule], 
  controllers: [MultimediasController],
  providers: [MultimediaService, PrismaService],
})
export class MultimediasModule {}
