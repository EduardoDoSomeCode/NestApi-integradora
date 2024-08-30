import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PrismaModule } from 'src/common/utils/prisma.module';
import { PrismaService } from 'src/prisma.services';

@Module({
  imports:[ PrismaModule],
  providers: [FavoritesService, PrismaService],
  controllers: [FavoritesController],

  
})
export class FavoritesModule {}
