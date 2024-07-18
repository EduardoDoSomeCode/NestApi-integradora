// Importamos los decoradores y las clases necesarias desde '@nestjs/common'
// el servicio de la entidad y  los DTOs (Data Transfer Objects) para manejar los datos de entrada
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

// Definimos el controlador para manejar las rutas relacionadas con 'notes' e inyectamos el servicio en el constructor
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  // Ruta para crear una nueva entidad
  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    try {
      return await this.notesService.create(createNoteDto);
    } catch (error) {
      console.error('Error al crear la nota:', error.message); // Log del error
      throw new InternalServerErrorException('Error al crear la nota');
    }
  }

  // Ruta para obtener todas las entidades  
  @Get() 
  async findAll() {
    try {
      return await this.notesService.findAll();
    } catch (error) {
      console.error('Error al obtener las notas:', error.message); // Log del error
      throw new InternalServerErrorException('Error al obtener las notas');
    }
  }

  // Ruta para obtener una entidad por su ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const noteId = BigInt(id);  // Convertir a BigInt
      const note = await this.notesService.findOne(noteId);
      if (!note) {
        throw new NotFoundException('Nota no encontrada');
      }
      return note;
    } catch (error) {
      console.error('Error al obtener la nota:', error.message); // Log del error
      throw new InternalServerErrorException('Error al obtener la nota');
    }
  }

  // Ruta para actualizar una entidad por su ID
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    try {
      const noteId = BigInt(id);  // Convertir a BigInt
      if (!updateNoteDto.title && !updateNoteDto.body && updateNoteDto.isFavorite === undefined) {
        throw new Error('Datos insuficientes para actualizar la nota');
      }
      return await this.notesService.update(noteId, updateNoteDto);
    } catch (error) {
      console.error('Error al actualizar la nota:', error.message); // Log del error
      throw new InternalServerErrorException('Error al actualizar la nota');
    }
  }

  // Ruta para eliminar una entidad por su ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const noteId = BigInt(id);  // Convertir a BigInt
      const deletedNote = await this.notesService.remove(noteId);
      if (!deletedNote) {
        throw new NotFoundException('Nota no encontrada para eliminar');
      }
      return deletedNote;
    } catch (error) {
      console.error('Error al eliminar la nota:', error.message); // Log del error
      throw new InternalServerErrorException('Error al eliminar la nota');
    }
  }
}
