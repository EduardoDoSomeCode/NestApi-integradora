import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/utils/prisma.service';
import { Prisma, Habits } from '@prisma/client';

export interface Habit {
  id: number;
  text: string;
  date: Date;
}

@Injectable()
export class HabitsService {
  private sampleHabits: Habit[] = [
    {
      id: 1,
      text: 'Read for 30 minutes daily',
      date: new Date('2024-07-05'),
    },
    {
      id: 2,
      text: 'Exercise for 1 hour',
      date: new Date('2024-07-04'),
    },
    {
      id: 3,
      text: 'Meditate for 15 minutes',
      date: new Date('2024-07-03'),
    },
  ];

  constructor(private readonly prisma: PrismaService) {}

  async createHabitFromSample(id: number): Promise<Habits> {
    const habitData = this.sampleHabits.find(habit => habit.id === id);
   

    try {
      const newHabit = await this.prisma.habits.create({
        data: {
          title: habitData.text,
          recentDate: habitData.date,
          userId: 1, // Ajusta el userId según tu lógica de negocio
        },
      });
      return newHabit;
    } catch (error) {
      console.error('Error al crear hábito:', error);
      throw new Error('No se pudo crear el hábito. Verifica los datos proporcionados.');
    }
  }
  
  async findAll(): Promise<Habits[]> {
    return this.prisma.habits.findMany();
  }

  async findOne(idHabits: bigint): Promise<Habits> {
    const habit = await this.prisma.habits.findUnique({
      where: { idHabits },
    });

    if (!habit) {
      throw new NotFoundException(`El hábito con id ${idHabits} no se encontró`);
    }

    return habit;
  }

  async update(idHabits: bigint, data: Prisma.HabitsUpdateInput): Promise<Habits> {
    const habit = await this.prisma.habits.update({
      where: { idHabits },
      data,
    });

    if (!habit) {
      throw new NotFoundException(`El hábito con id ${idHabits} no se encontró`);
    }

    return habit;
  }
  
  async remove(idHabits: bigint): Promise<Habits> {
    const habit = await this.prisma.habits.delete({
      where: { idHabits },
    });

    if (!habit) {
      throw new NotFoundException(`El hábito con id ${idHabits} no se encontró`);
    }

    return habit;
  }
}
