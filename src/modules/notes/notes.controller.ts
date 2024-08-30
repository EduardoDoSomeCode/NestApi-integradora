
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('notes') // Agrupa las rutas bajo la etiqueta 'notes' en la documentación de Swagger.
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva nota' }) // Describe la operación en la documentación de Swagger.
  @ApiResponse({ status: 201, description: 'La nota ha sido creada exitosamente.' }) // Respuesta esperada en caso de éxito.
  @ApiResponse({ status: 400, description: 'Datos inválidos para crear una nota.' }) // Respuesta esperada en caso de datos inválidos.
  @ApiBody({ description: 'Datos requeridos para crear una nota', type: CreateNoteDto }) // Define la estructura del cuerpo de la solicitud.
  async create(@Body() createNoteDto: CreateNoteDto): Promise<any> {
    if (createNoteDto.isFavorite === undefined || typeof createNoteDto.isFavorite !== 'boolean') {
      throw new HttpException('Se requiere marcar si es favorito o no', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.notesService.create(createNoteDto);

      const response = JSON.stringify(result, (_key, value) => {
        // Convertir BigInt a string
        if (typeof value === 'bigint') {
          return value.toString();
        }
        return value;
      });

      return response;
    } catch (error) {
      throw new Error('Error al crear la nota');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las notas' })
  @ApiResponse({ status: 200, description: 'Notas obtenidas exitosamente.' })
  @ApiResponse({ status: 500, description: 'Error al obtener las notas.' })
  async findAll() {
    try {
      return await this.notesService.findAll();
    } catch (error) {
      console.log('Error al obtener las notas');
      throw new InternalServerErrorException('Error al obtener las notas');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una nota por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la nota', type: String })
  @ApiResponse({ status: 200, description: 'Nota encontrada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada.' })
  @ApiResponse({ status: 500, description: 'Error al obtener la nota.' })
  async findOne(@Param('id') id: string) {
    try {
      const noteId = BigInt(id);  // Convertir a BigInt
      const note = await this.notesService.findOne(noteId);

      if (!note) {
        throw new NotFoundException('Nota no encontrada');
      }

      return note;
    } catch (error) {
      console.log('Error al obtener la nota');
      throw new InternalServerErrorException('Error al obtener la nota');
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una nota por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la nota', type: String })
  @ApiResponse({ status: 200, description: 'Nota actualizada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos para actualizar la nota.' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada.' })
  @ApiResponse({ status: 500, description: 'Error al actualizar la nota.' })
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    try {
      const noteId = BigInt(id);  // Convertir a BigInt

      if (!updateNoteDto.title && !updateNoteDto.body && updateNoteDto.isFavorite === undefined) {
        throw new Error('Datos insuficientes para actualizar la nota');
      }

      return await this.notesService.update(noteId, updateNoteDto);
    } catch (error) {
      console.log('Error al actualizar la nota');
      throw new InternalServerErrorException('Error al actualizar la nota');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una nota por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la nota', type: String })
  @ApiResponse({ status: 200, description: 'Nota eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada para eliminar.' })
  @ApiResponse({ status: 500, description: 'Error al eliminar la nota.' })
  async remove(@Param('id') id: string) {
    try {
      const noteId = BigInt(id);  // Convertir a BigInt
      const deletedNote = await this.notesService.remove(noteId);

      if (!deletedNote) {
        throw new NotFoundException('Nota no encontrada para eliminar');
      }

      return deletedNote;
    } catch (error) {
      console.log('Error al eliminar la nota');
      throw new InternalServerErrorException('Error al eliminar la nota');
    }
  }
}