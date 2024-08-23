import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/utils/prisma.service';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto'

@Injectable()
export class MultimediaService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createMultimediaDto: CreateMultimediaDto): Promise<any> {
    try {
      const newMultimedia = await this.prisma.multimedia.create({
        data: {
          id: createMultimediaDto.id,
          notesId: createMultimediaDto.notesId, // Incluye el campo notesId aquí
          itIsImage: createMultimediaDto.itIsImage,
          link: createMultimediaDto.link,
          itIsSound: createMultimediaDto.itIsSound,
        },
      });
      return newMultimedia;
    } catch (error) {
      throw new Error('Error al crear el multimedia');
    }
  }

  async findAll() {
    try {
      console.log('Obteniendo todos los multimedia');
      return await this.prisma.multimedia.findMany();
    } catch (error) {
      throw new Error('Error al obtener los multimedia');
    }
  }

  async findOne(id: bigint): Promise<any> {
    try {
      const multimedia = await this.prisma.multimedia.findUnique({
        where: { id: id },
      });
      return multimedia;
    } catch (error) {
      throw new Error('Error al obtener el multimedia');
    }
  }

  async update(id: bigint, updateMultimediaDto: UpdateMultimediaDto): Promise<any> {
    try {
      const updatedMultimedia = await this.prisma.multimedia.update({
        where: { id: id },
        data: {
          itIsImage: updateMultimediaDto.itIsImage,
          link: updateMultimediaDto.link,
          itIsSound: updateMultimediaDto.itIsSound,
          // No es necesario actualizar notesId, ya que es un campo obligatorio en la creación
        },
      });
      return updatedMultimedia;
    } catch (error) {
      throw new Error('Error al actualizar el multimedia');
    }
  }

  async remove(id: bigint): Promise<any> {
    try {
      const deletedMultimedia = await this.prisma.multimedia.delete({
        where: { id: id },
      });
      return deletedMultimedia;
    } catch (error) {
      throw new Error('Error al eliminar el multimedia');
    }
  }
}
