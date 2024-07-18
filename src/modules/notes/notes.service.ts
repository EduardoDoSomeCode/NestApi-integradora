import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../../common/utils/prisma.service';
import ExceptionBad from 'src/common/utils/ExceptionBad';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  // Método para crear una nueva nota
  async create(createNoteDto: CreateNoteDto) {
    const { title, body, IdUser, isFavorite } = createNoteDto;
    try {
      console.log('Creando una nueva nota con los datos:', createNoteDto); // Log de depuración
      // Verificar si el usuario existe
      const userExists = await this.prisma.user.findUnique({
        where: { IdUser: BigInt(IdUser) },  // Asegúrate de que 'id' es el nombre correcto del campo
      });
      if (!userExists) {
        throw new Error(`El usuario con ID ${IdUser} no existe.`);
      }
      // Crear la nota
      return await this.prisma.notes.create({
        data: {
          title,
          body,
          userId: BigInt(IdUser),  // Convertir IdUser a BigInt si es necesario
          IsFavorite: isFavorite || false,
        },
      });
    } catch (error) {
      console.error('Error al crear la nota:', error); // Log del error
      throw new ExceptionBad(error.code, error, error.meta);
    }
  }

  // Método para obtener todas las notas
  async findAll() {
    try {
      console.log('Obteniendo todas las notas'); // Log de depuración
      return await this.prisma.notes.findMany();
    } catch (error) {
      console.error('Error al obtener las notas:', error); // Log del error
      throw new ExceptionBad(error.code, error, error.meta);
    }
  }

  // Método para obtener una nota por su ID
  async findOne(id: bigint) {
    try {
      console.log(`Obteniendo la nota con ID: ${id}`); // Log de depuración
      const note = await this.prisma.notes.findUnique({
        where: { idNotes: id },
      });
      if (!note) {
        throw new Error('Nota no encontrada');
      }
      return note;
    } catch (error) {
      console.error('Error al obtener la nota:', error); // Log del error
      throw new ExceptionBad(error.code, error, error.meta);
    }
  }

  // Método para actualizar una nota por su ID
  async update(id: bigint, updateNoteDto: UpdateNoteDto) {
    const { title, body, isFavorite } = updateNoteDto;
    try {
      console.log(`Actualizando la nota con ID: ${id} con los datos:`, updateNoteDto); // Log de depuración
      return await this.prisma.notes.update({
        where: { idNotes: id },
        data: {
          title,
          body,
          IsFavorite: isFavorite,
        },
      });
    } catch (error) {
      console.error('Error al actualizar la nota:', error); // Log del error
      throw new ExceptionBad(error.code, error, error.meta);
    }
  }

  // Método para eliminar una nota por su ID
  async remove(id: bigint) {
    try {
      console.log(`Eliminando la nota con ID: ${id}`); // Log de depuración
      return await this.prisma.notes.delete({
        where: { idNotes: id },
      });
    } catch (error) {
      console.error('Error al eliminar la nota:', error); // Log del error
      throw new ExceptionBad(error.code, error, error.meta);
    }
  }
}