import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/utils/prisma.service';
import { Prisma, Habits } from '@prisma/client';
import ExceptionBad from 'src/common/utils/ExceptionBad';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

export interface Habit { // Definición de la interfaz Habit
  id: number;
  userId: number;
  title: string; 
  description: string;
  date: Date; 
}

@Injectable()
export class HabitsService {


  constructor(private readonly prisma: PrismaService) {} // Inyección para el servicio de Prisma

  async create(createHabitDto: CreateHabitDto): Promise<any> {
    try {
      const newHabit = await this.prisma.habits.create({
        data: {
          userId: BigInt(createHabitDto.userId),
          title: createHabitDto.title,
          recentDate: createHabitDto.recentDate,  // Convertir la fecha a un objeto Date
          // description: createHabitDto.description || null,
        },
      });
      return newHabit;
    } catch (error) {
      console.error('Error al crear el hábito:', error);
      throw new Error('Error al crear el hábito');
    }
  }

  async findOne(id: bigint): Promise<any> {
    try {
      const habit = await this.prisma.habits.findUnique({
        where: { idHabits: id },
      });
      return habit;
    } catch (error) {
      console.error('Error al obtener el hábito:', error);
      throw new Error('Error al obtener el hábito');
    }
  }

  async update(id: bigint, updateHabitDto: UpdateHabitDto): Promise<any> {
    try {
      const updatedHabit = await this.prisma.habits.update({
        where: { idHabits: id },
        data: {
          userId: updateHabitDto.userId ? BigInt(updateHabitDto.userId) : undefined,
          title: updateHabitDto.title,
          recentDate: updateHabitDto.recentDate,
          // description: updateHabitDto.description || null,
        },
      });
      return updatedHabit;
    } catch (error) {
      console.error('Error al actualizar el hábito:', error);
      throw new Error('Error al actualizar el hábito');
    }
  }

  async remove(id: bigint): Promise<any> {
    try {
      const deletedHabit = await this.prisma.habits.delete({
        where: { idHabits: id },
      });
      return deletedHabit;
    } catch (error) {
      console.error('Error al eliminar el hábito:', error);
      throw new Error('Error al eliminar el hábito');
    }
  }
}