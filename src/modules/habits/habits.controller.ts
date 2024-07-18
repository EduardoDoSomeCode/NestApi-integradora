import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Habits } from '@prisma/client';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post() // La acción POST para crear un nuevo hábito en DTO
  createTask(@Body() newHabit: CreateHabitDto): Promise<Habits> {
    return this.habitsService.createHabitFromSample({ ...newHabit } as any);
  }

  @Get() // Para obtener todos los hábitos
  findAll(): Promise<Habits[]> {
    return this.habitsService.findAll();
  }

  @Get(':id') // Es para obtener un hábito mediante por su ID
  findOne(@Param('id', ParseIntPipe) userId: bigint): Promise<Habits> {
    return this.habitsService.findOne(userId);
  }

  @Patch(':id') //Funciona para actualizar un hábito mediante por su ID
  update(@Param('id', ParseIntPipe) userId: bigint, @Body() UpdateHabitDto: UpdateHabitDto): Promise<Habits> {
    return this.habitsService.update(userId, UpdateHabitDto as any);
  }

  @Delete(':id') //Se ELimina un hábito mediante por su ID
  remove(@Param('id', ParseIntPipe) userId: bigint): Promise<Habits> {
    return this.habitsService.remove(userId);
  }
}
