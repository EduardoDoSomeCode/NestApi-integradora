import { Module } from '@nestjs/common';
import { MultimediasService } from './multimedias.service';
import { MultimediasController } from './multimedias.controller';
import { PrismaModule } from 'src/common/utils/prisma.module';


@Module({
  imports: [PrismaModule], 
  controllers: [MultimediasController],
  providers: [MultimediasService],
})
export class MultimediasModule {}
