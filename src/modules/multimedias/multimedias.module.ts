import { Module } from '@nestjs/common';
import { MultimediasService } from './multimedias.service';
import { MultimediasController } from './multimedias.controller';

@Module({
  controllers: [MultimediasController],
  providers: [MultimediasService],
})
export class MultimediasModule {}
