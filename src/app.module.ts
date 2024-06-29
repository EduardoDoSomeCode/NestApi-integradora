import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllModule } from './all/all.module';
import { HabitsModule } from './habits/habits.module';
import { NotesModule } from './notes/notes.module';
import { QuotesModule } from './quotes/quotes.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({

  imports: [AllModule, HabitsModule, NotesModule, QuotesModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
