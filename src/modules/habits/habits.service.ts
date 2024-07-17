import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/utils/prisma.service';
import { Prisma, Habits } from '@prisma/client';
import ExceptionBad from 'src/common/utils/ExceptionBad';

export interface Habit { // Definición de la interfaz Habit
  id: number;
  title: string; 
  date: Date; 
}

@Injectable()
export class HabitsService {
  private sampleHabits: Habit[] = [ // Ejemplos de hábitos predefinidos
    {
      id: 1,
      title: 'Read for 30 minutes daily',
      date: new Date('2024-07-05'),
    },
    {
      id: 2,
      title: 'Exercise for 1 hour',
      date: new Date('2024-07-04'),
    },
    {
      id: 3,
      title: 'Meditate for 15 minutes',
      date: new Date('2024-07-03'),
    },
  ];

  constructor(private readonly prisma: PrismaService) {} // Inyección para el servicio de Prisma

  async createHabitFromSample(id: number): Promise<Habits> {
    const habitData = this.sampleHabits.find(habit => habit.id === id);

    try { // Crear un nuevo hábito en la base de datos utilizando Prisma
      const newHabit = await this.prisma.habits.create({
        data: {
          title: habitData.title,
          recentDate: habitData.date,
          userId: 1, // Ajustar userId según lógica de la aplicación
        },
      });
      return newHabit; // Retorna el nuevo hábito creado
    } catch (error) {
      throw new ExceptionBad(error.code, error, error.meta); 
    }
  }
  
  async findAll(): Promise<Habits[]> { // Obtener todos los hábitos
    return this.prisma.habits.findMany()
      .catch((error) => {
        throw ExceptionBad(error.code, error, error.meta); 
      });
  }

  async findOne(idHabits: bigint): Promise<Habits> { // Obtener un hábito por ID
    try {
      const habit = await this.prisma.habits.findUnique({
        where: { idHabits },
      });

      if (!habit) {
        throw new NotFoundException(`El hábito con id ${idHabits} no se encontró`); 
      }

      return habit;
    } catch (error) {
      throw new ExceptionBad(error.code, error, error.meta); 
    }
  }

  async update(idHabits: bigint, data: Prisma.HabitsUpdateInput): Promise<Habits> { // Actualizar un hábito por ID
    try {
      const habit = await this.prisma.habits.update({
        where: { idHabits },
        data,
      });

      if (!habit) {
        throw new NotFoundException(`El hábito con id ${idHabits} no se encontró`); // Excepción si no se encuentra el hábito
      }

      return habit;
    } catch (error) {
      throw new ExceptionBad(error.code, error, error.meta); 
    }
  }
  
  async remove(idHabits: bigint): Promise<Habits> { // Eliminar un hábito por ID
    try {
      const habit = await this.prisma.habits.delete({
        where: { idHabits },
      });

      if (!habit) {
        throw new NotFoundException(`El hábito con id ${idHabits} no se encontró`); 
      }

      return habit;
    } catch (error) {
      throw new ExceptionBad(error.code, error, error.meta); 
    }
  }
}