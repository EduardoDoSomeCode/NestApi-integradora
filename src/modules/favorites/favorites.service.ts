import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/prisma.services';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const { noteId } = createFavoriteDto;
    const existingNote = await this.prisma.notes.findUnique({ where: { idNotes: noteId } });
    if (!existingNote) {
      throw new NotFoundException(`Note with ID ${noteId} not found.`);
    }

    return this.prisma.favorites.create({
      data: {
        noteId,
      },
    });
  }

  async findAll() {
    return this.prisma.favorites.findMany();
  }

  async findOne(id: number) {
    const favorite = await this.prisma.favorites.findUnique({
      where: { id },
      include: { note: true }, // Incluir la relación con la nota asociada
    });
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found.`);
    }
    return favorite;
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    const { noteId } = updateFavoriteDto;
    const existingNote = await this.prisma.notes.findUnique({ where: { idNotes: noteId } });
    if (!existingNote) {
      throw new NotFoundException(`Note with ID ${noteId} not found.`);
    }

    return this.prisma.favorites.update({
      where: { id },
      data: {
        noteId,
      },
    });
  }

  async remove(id: number) {
    const favorite = await this.prisma.favorites.findUnique({ where: { id } });
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found.`);
    }

    return this.prisma.favorites.delete({ where: { id } });
  }
}
