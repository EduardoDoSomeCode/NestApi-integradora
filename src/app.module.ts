import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectsModule } from './proyects/proyects.module';

@Module({
  imports: [ProyectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
