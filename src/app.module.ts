import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProyectsModule } from './proyects/proyects.module';




@Module({

  imports: [ProyectsModule, AuthModule, UsersModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
