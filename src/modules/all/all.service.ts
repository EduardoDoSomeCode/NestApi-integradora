import { Injectable } from '@nestjs/common';

// Importa los DTOs (Data Transfer Objects) utilizados para la creación y actualización de registros.
import { CreateAllDto } from './dto/create-all.dto';
import { UpdateAllDto } from './dto/update-all.dto';
import { PrismaService } from '../../common/prisma.service';
import { All } from '@prisma/client';

// Define un tipo `AllTodo` como `any`
export type AllTodo = any;

// Marca la clase AllService como un servicio inyectable en el sistema de dependencias de NestJS.
@Injectable()
export class AllService {
  // Declara una propiedad `prisma` para almacenar una instancia del servicio PrismaService.
  constructor(private readonly prisma: PrismaService) {}

  // Define una lista de tareas de ejemplo para simular la base de datos.
  // Esta lista se usa para las operaciones CRUD.
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

  // Método para crear una nueva tarea.
  async create(createAllDto: CreateAllDto): Promise<All> {
    const newTodo: All = {
      idAll: BigInt(this.Alltodos.length + 1),
      ...createAllDto,
      userId: 0n,
      title: '',
    };
    this.Alltodos.push(newTodo); // Esto nos permite agrega la nueva tarea a la lista de tareas.
    return newTodo; // en esta parte nos devuelve la tarea creada.
  }

  // Encuentra todas las tareas.

  async findAll(): Promise<All[]> {
    return this.Alltodos; // aqui devuelve la lista completa de tareas.
  }

  // en este metodo tenemos la opcion para encontrar una tarea por su ID.
  async findOne(id: bigint): Promise<All> {
    const todo = this.Alltodos.find((todo) => todo.idAll === id);
    return todo; // Devuelve la tarea encontrada o `undefined` si no se encuentra.
  }

  // utilizamos el siguiente metodo para poder actualizar una tarea ya existente.
  // Busca la tarea por su ID, actualiza sus datos con el DTO de actualización y devuelve la tarea actualizada.
  async update(id: bigint, updateAllDto: UpdateAllDto): Promise<All> {
    const todoIndex = this.Alltodos.findIndex((todo) => todo.idAll === id); // Encuentra el índice de la tarea a actualizar.
    if (todoIndex === -1) {
      return null; // Devuelve null si la tarea no existe.
    }
    const updatedTodo = { ...this.Alltodos[todoIndex], ...updateAllDto }; // Crea un nuevo objeto con los datos actualizados.
    this.Alltodos[todoIndex] = updatedTodo; // este es para remplazar las tareas antiguas.
    return updatedTodo; // Devuelve la tarea actualizada.
  }

  async remove(id: bigint): Promise<boolean> {
    // Método para eliminar una tarea por su ID.
    const todoIndex = this.Alltodos.findIndex((todo) => todo.idAll === id);
    if (todoIndex === -1) {
      // Verifica si la tarea no existe.
      return false; // Devuelve false si la tarea no esta.
    }
    this.Alltodos.splice(todoIndex, 1);
    // Elimina la tarea de la lista.
    return true; // Devuelve true si la tarea fue eliminada con éxito.
  }
}
