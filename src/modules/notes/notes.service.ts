// Importamos el decorador Injectable desde '@nestjs/common', los DTOs (Data Transfer Objects) para manejar los datos de entrada y salida
// y el el servicio de Prisma para interactuar con la base de datos
import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../../common/utils/prisma.service';

// Decoramos el servicio como Injectable para que NestJS pueda gestionarlo e inyectamos el servicio de Prisma a través del constructor
@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

// Método para crear una nueva nota
  async create(createNoteDto: CreateNoteDto) {
    const { title, body, IdUser, isFavorite } = createNoteDto;
    try {
      // Crear una nueva nota en la base de datos utilizando Prisma
      return await this.prisma.notes.create({
        data: {
          title,
          body,
          userId: BigInt(IdUser),  // Convertir IdUser a BigInt si es necesario
          IsFavorite: isFavorite || false,
        },
      });
    } catch (error) {
      // Capturar errores y lanzar una excepción con un mensaje descriptivo
      console.error('Error creating note:', error);
      throw new Error('Error al crear la nota');
    }
  }

// Método para obtener todas las notas
  async findAll() {
    try {
      // Obtener todas las notas desde la base de datos utilizando Prisma
      return await this.prisma.notes.findMany();
    } catch (error) {
      // Capturar errores y lanzar una excepción con un mensaje descriptivo
      console.error('Error finding notes:', error);
      throw new Error('Error al obtener las notas');
    }
  }

// Método para obtener una nota por su ID
  async findOne(id: bigint) {
    try {
      // Buscar una nota específica por su ID utilizando Prisma
      const note = await this.prisma.notes.findUnique({
        where: { idNotes: id },
      });
      if (!note) {
        throw new Error('Nota no encontrada');
      }
      return note;
    } catch (error) {
      // Capturar errores y lanzar una excepción con un mensaje descriptivo
      console.error('Error finding note:', error);
      throw new Error('Error al obtener la nota');
    }
  }

// Método para actualizar una nota por su ID
  async update(id: bigint, updateNoteDto: UpdateNoteDto) {
    const { title, body, isFavorite } = updateNoteDto;
    try {
      // Actualizar una nota específica por su ID utilizando Prisma
      return await this.prisma.notes.update({
        where: { idNotes: id },
        data: {
          title,
          body,
          IsFavorite: isFavorite,
        },
      });
    } catch (error) {
      // Capturar errores y lanzar una excepción con un mensaje descriptivo
      console.error('Error updating note:', error);
      throw new Error('Error al actualizar la nota');
    }
  }

// Método para eliminar una nota por su ID
  async remove(id: bigint) {
    try {
      // Eliminar una nota específica por su ID utilizando Prisma
      return await this.prisma.notes.delete({
        where: { idNotes: id },
      });
    } catch (error) {
      // Capturar errores y lanzar una excepción con un mensaje descriptivo
      console.error('Error deleting note:', error);
      throw new Error('Error al eliminar la nota');
    }
  }
}
