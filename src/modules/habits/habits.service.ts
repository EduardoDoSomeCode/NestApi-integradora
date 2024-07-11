import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/utils/prisma.service';
import { Prisma, Habits } from '@prisma/client';

export interface Habit { // Definición de la interfaz Habit
  id: number;
  text: string;
  date: Date;
}

@Injectable()
export class HabitsService { //Se crea una Array de hábitos que se muestra
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

  constructor(private readonly prisma: PrismaService) {} // Inyección del constructor privado para el servicio Prisma

  async createHabitFromSample(id: number): Promise<Habits> {
    const habitData = this.sampleHabits.find(habit => habit.id === id);
   

    try {
      const newHabit = await this.prisma.habits.create({ //Crea un nuevo hábito en la base de datos utilizando Prisma
        data: {
          title: habitData.text,
          recentDate: habitData.date,
          userId: 1, // Ajusta el userId según tu lógica 
        },
      });
      return newHabit; //Una condición en caso de que no se crear el habito
    } catch (error) {
      console.error('Error al crear hábito:', error);
      throw new Error('No se pudo crear el hábito. Verifica los datos proporcionados.');
    }
  }
  
  async findAll(): Promise<Habits[]> { //Es para obtener todos los hábitos 
    return this.prisma.habits.findMany();
  }

  async findOne(idHabits: bigint): Promise<Habits> { //Es para obtener un hábito por su id
    const habit = await this.prisma.habits.findUnique({
      where: { idHabits },
    });

    if (!habit) {
      throw new NotFoundException(`El hábito con id ${idHabits} no se encontró`);
    }

    return habit;
  }

  async update(idHabits: bigint, data: Prisma.HabitsUpdateInput): Promise<Habits> { // Para uno o varios campos en actualizar un hábito
    const habit = await this.prisma.habits.update({
      where: { idHabits },
      data,
    });

    if (!habit) {
      throw new NotFoundException(`El hábito con id ${idHabits} no se encontró`);
    }

    return habit;
  }
  
  async remove(idHabits: bigint): Promise<Habits> { // Para eliminar un hábito meidante de su ID
    const habit = await this.prisma.habits.delete({
      where: { idHabits },
    });

    if (!habit) {
      throw new NotFoundException(`El hábito con id ${idHabits} no se encontró`);
    }

    return habit;
  }
}
