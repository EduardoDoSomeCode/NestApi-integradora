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
  async create(createAllDto: CreateAllDto): Promise<All> {
    try {
      const newTodo: All = {
        idAll: BigInt(this.Alltodos.length + 1), // Genera un nuevo ID (simulado)
        ...createAllDto,
        userId: 0n
      };
      this.Alltodos.push(newTodo); // Agrega la nueva tarea al array simulado
      return newTodo; // Retorna la tarea creada
    } catch (error) {
      throw new ExceptionBad(error.code, error, error.meta); // Lanza una excepción personalizada en caso de error
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
  async findOne(id: bigint): Promise<All> {
    try {
      const todo = this.Alltodos.find((todo) => todo.idAll === id); // Busca la tarea por su ID en el array simulado
      return todo; // Retorna la tarea encontrada o undefined si no se encuentra
    } catch (error) {
      throw new ExceptionBad(error.code, error, error.meta); // Lanza una excepción personalizada en caso de error
    }
  }

  // Método para actualizar una tarea existente
  async update(id: bigint, updateAllDto: UpdateAllDto): Promise<All> {
    try {
      const todoIndex = this.Alltodos.findIndex((todo) => todo.idAll === id); // Encuentra el índice de la tarea a actualizar
      if (todoIndex === -1) {
        return null; // Retorna null si la tarea no existe
      }
      const updatedTodo = { ...this.Alltodos[todoIndex], ...updateAllDto }; // Crea un nuevo objeto con los datos actualizados
      this.Alltodos[todoIndex] = updatedTodo; // Reemplaza la tarea antigua con la actualizada en el array simulado
      return updatedTodo; // Retorna la tarea actualizada
    } catch (error) {
      throw new ExceptionBad(error.code, error, error.meta); // Lanza una excepción personalizada en caso de error
    }
  }

  // Método para eliminar una tarea por su ID
  async remove(id: bigint): Promise<boolean> {
    try {
      const todoIndex = this.Alltodos.findIndex((todo) => todo.idAll === id); // Encuentra el índice de la tarea a eliminar
      if (todoIndex === -1) {
        return false; // Retorna false si la tarea no existe
      }
      this.Alltodos.splice(todoIndex, 1); // Elimina la tarea del array simulado
      return true; // Retorna true si la tarea fue eliminada con éxito
    } catch (error) {
      throw new ExceptionBad(error.code, error, error.meta); // Lanza una excepción personalizada en caso de error
    }
  }
}