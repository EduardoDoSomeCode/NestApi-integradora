import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Habits } from '@prisma/client';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}
  @Post()
  async create(@Body() createHabitDto: CreateHabitDto): Promise<any> {
    createHabitDto.recentDate = new Date(createHabitDto.recentDate);
    return this.habitsService.create(createHabitDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<any> {
    const bigIntId = BigInt(id);
    const habit = await this.habitsService.findOne(bigIntId);
    if (!habit) {
      throw new NotFoundException(`Hábito con ID ${id} no se encontró.`);
    }
    return habit;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateHabitDto: UpdateHabitDto): Promise<any> {
    const bigIntId = BigInt(id);
    return this.habitsService.update(bigIntId, updateHabitDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string): Promise<any> {
    const bigIntId = BigInt(id);
    const result = await this.habitsService.remove(bigIntId);
    if (!result) {
      throw new NotFoundException(`Hábito con ID ${id} no se encontró.`);
    }
    return result;
  }
}
