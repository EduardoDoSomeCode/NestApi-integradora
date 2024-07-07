import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../../common/utils/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto) {
    const { title, body, IdUser, isFavorite } = createNoteDto;
    try {
      return await this.prisma.notes.create({
        data: {
          title,
          body,
          userId: BigInt(IdUser),  // Convertir IdUser a BigInt
          IsFavorite: isFavorite || false,
        },
      });
    } catch (error) {
      console.error('Error creating note:', error);
      throw new Error('Error al crear la nota');
    }
  }

  async findAll() {
    try {
      return await this.prisma.notes.findMany();
    } catch (error) {
      console.error('Error finding notes:', error);
      throw new Error('Error al obtener las notas');
    }
  }

  async findOne(id: bigint) {
    try {
      const note = await this.prisma.notes.findUnique({
        where: { idNotes: id },
      });
      if (!note) {
        throw new Error('Nota no encontrada');
      }
      return note;
    } catch (error) {
      console.error('Error finding note:', error);
      throw new Error('Error al obtener la nota');
    }
  }

  async update(id: bigint, updateNoteDto: UpdateNoteDto) {
    const { title, body, isFavorite } = updateNoteDto;
    try {
      return await this.prisma.notes.update({
        where: { idNotes: id },
        data: {
          title,
          body,
          IsFavorite: isFavorite,
        },
      });
    } catch (error) {
      console.error('Error updating note:', error);
      throw new Error('Error al actualizar la nota');
    }
  }

  async remove(id: bigint) {
    try {
      return await this.prisma.notes.delete({
        where: { idNotes: id },
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      throw new Error('Error al eliminar la nota');
    }
  }
}
