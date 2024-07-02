import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllModule } from './modules/all/all.module';
import { HabitsModule } from './modules/habits/habits.module';
import { NotesModule } from './modules/notes/notes.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({


  imports: [AllModule, HabitsModule, NotesModule, QuotesModule, FavoritesModule, AuthModule, UsersModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
