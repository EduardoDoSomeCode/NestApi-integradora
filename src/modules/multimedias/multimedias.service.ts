import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/utils/prisma.service';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto'

@Injectable()
export class MultimediaService {

  constructor(private readonly prisma: PrismaService) {}

  // Método para crear un nuevo registro de multimedia
  async create(createMultimediaDto: CreateMultimediaDto): Promise<any> {
    try {
      // Inserta un nuevo registro en la base de datos usando Prisma
      const newMultimedia = await this.prisma.multimedia.create({
        data: {
          id: createMultimediaDto.id,  // Asigna el ID proporcionado
          notesId: createMultimediaDto.notesId, // Incluye el campo notesId
          itIsImage: createMultimediaDto.itIsImage, // Indica si es una imagen
          link: createMultimediaDto.link, // Proporciona el enlace multimedia
          itIsSound: createMultimediaDto.itIsSound, // Proporciona el enlace de sonido
        },
      });
      return newMultimedia; // Devuelve el registro creado
    } catch (error) {
      throw new Error('Error al crear el multimedia'); // Maneja errores en la creación
    }
  }

  // Método para obtener todos los registros de multimedia
  async findAll() {
    try {
      console.log('Obteniendo todos los multimedia');
      return await this.prisma.multimedia.findMany(); // Recupera todos los registros de multimedia
    } catch (error) {
      throw new Error('Error al obtener los multimedia'); // Maneja errores en la recuperación
    }
  }

  // Método para obtener un registro de multimedia por su ID
  async findOne(id: bigint): Promise<any> {
    try {
      // Busca un registro único en la base de datos usando el ID
      const multimedia = await this.prisma.multimedia.findUnique({
        where: { id: id },
      });
      return multimedia; // Devuelve el registro encontrado
    } catch (error) {
      throw new Error('Error al obtener el multimedia'); // Maneja errores en la búsqueda
    }
  }

  // Método para actualizar un registro de multimedia existente
  async update(id: bigint, updateMultimediaDto: UpdateMultimediaDto): Promise<any> {
    try {
      // Actualiza un registro en la base de datos usando el ID y los datos proporcionados
      const updatedMultimedia = await this.prisma.multimedia.update({
        where: { id: id },
        data: {
          itIsImage: updateMultimediaDto.itIsImage, // Actualiza si es una imagen
          link: updateMultimediaDto.link, // Actualiza el enlace multimedia
          itIsSound: updateMultimediaDto.itIsSound, // Actualiza el enlace de sonido
          // notesId no se actualiza ya que es obligatorio en la creación
        },
      });
      return updatedMultimedia; // Devuelve el registro actualizado
    } catch (error) {
      throw new Error('Error al actualizar el multimedia'); // Maneja errores en la actualización
    }
  }

  // Método para eliminar un registro de multimedia por su ID
  async remove(id: bigint): Promise<any> {
    try {
      // Elimina un registro en la base de datos usando el ID
      const deletedMultimedia = await this.prisma.multimedia.delete({
        where: { id: id },
      });
      return deletedMultimedia; // Devuelve el registro eliminado
    } catch (error) {
      throw new Error('Error al eliminar el multimedia'); // Maneja errores en la eliminación
    }
  }
}
