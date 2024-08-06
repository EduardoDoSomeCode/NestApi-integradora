import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllModule } from './modules/all/all.module';
import { AuthModule } from './modules/auth/auth.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { HabitsModule } from './modules/habits/habits.module';
import { NotesModule } from './modules/notes/notes.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './prisma.services';
/* import { ProjectModule } from './project/project.module'; */


@Module({

  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'db_better',
      entities: [],
      synchronize: true,
    }),
    AllModule, HabitsModule, NotesModule, QuotesModule, FavoritesModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],

})
export class AppModule { }

