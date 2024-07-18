import { Injectable } from '@nestjs/common';
import { CreateAllDto } from './dto/create-all.dto'; // Importa el DTO para la creación de tareas
import { UpdateAllDto } from './dto/update-all.dto'; // Importa el DTO para la actualización de tareas
import { PrismaService } from '../../common/utils/prisma.service'; // Importa el servicio PrismaService
import { All } from '@prisma/client'; // Importa el modelo de base de datos All
import ExceptionBad from 'src/common/utils/ExceptionBad'; // Importa la clase de excepción personalizada

// Define un tipo AllTodo como any para flexibilidad
export type AllTodo = any;

// Marca la clase AllService como un servicio inyectable en NestJS
@Injectable()
export class AllService {
  constructor(private readonly prisma: PrismaService) {} // Inyección del servicio Prisma

  // Array de tareas de ejemplo, simula una base de datos
  private Alltodos: AllTodo[] = [
    {
      id: 1,
      userId: 1,
      title: 'Clean the dishes',
    },
    {
      id: 2,
      userId: 2,
      title: 'Programming a bit',
    },
  ];

  // Método para crear una nueva tarea
  async create(createAllDto: CreateAllDto): Promise<any> {
    try {
      const newItem = await this.prisma.all.create({
        data: createAllDto,
      });
      return newItem;
    } catch (error) {
      console.error('Error al crear el elemento:', error);
      throw new Error('Error al crear el elemento');
    }
  }


  // Método para obtener todas las tareas
  async findAll(): Promise<All[]> {
    try {
      return this.Alltodos; // Retorna todas las tareas del array simulado
    } catch (error) {
      throw new ExceptionBad(error.code, error, error.meta); // Lanza una excepción personalizada en caso de error
    }
  }

  // Método para encontrar una tarea por su ID
  async findOne(id: bigint): Promise<any> {
    try {
      const item = await this.prisma.all.findUnique({
        where: { idAll: id },
      });
      return item;
    } catch (error) {
      console.error('Error al obtener el elemento:', error);
      throw new Error('Error al obtener el elemento');
    }
  }

  // Método para actualizar una tarea existente
  async update(id: bigint, updateAllDto: UpdateAllDto): Promise<any> {
    try {
      const updatedItem = await this.prisma.all.update({
        where: { idAll: id },
        data: updateAllDto,
      });
      return updatedItem;
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      throw new Error('Error al actualizar el elemento');
    }
  }

  // Método para eliminar una tarea por su ID
  async remove(id: bigint): Promise<any> {
    try {
      const deletedItem = await this.prisma.all.delete({
        where: { idAll: id },
      });
      return deletedItem;
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
      return null;
    }
  }
}