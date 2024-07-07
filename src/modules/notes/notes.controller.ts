import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    try {
      return await this.notesService.create(createNoteDto);
    } catch (error) {
      throw new Error('Error al crear la nota');
    }
  }

  @Get() 
  async findAll() {
    try {
      return await this.notesService.findAll();
    } catch (error) {
      throw new Error('Error al obtener las notas');
    }
  }

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
      throw new Error('Error al obtener la nota');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    try {
      const noteId = BigInt(id);  // Convertir a BigInt

      if (!updateNoteDto.title && !updateNoteDto.body && updateNoteDto.isFavorite === undefined) {
        throw new Error('Datos insuficientes para actualizar la nota');
      }

      return await this.notesService.update(noteId, updateNoteDto);
    } catch (error) {
      throw new Error('Error al actualizar la nota');
    }
  }

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
      throw new Error('Error al eliminar la nota');
    }
  }
}
