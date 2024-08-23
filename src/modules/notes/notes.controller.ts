import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto) {
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
      throw new Error('Error al obtener todas las notas');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const note = await this.notesService.findOne(BigInt(id));
      if (!note) {
        throw new NotFoundException(`Nota con ID ${id} no encontrada`);
      }
      return note;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al encontrar la nota');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    try {
      const updatedNote = await this.notesService.update(BigInt(id), updateNoteDto);
      if (!updatedNote) {
        throw new NotFoundException(`Nota con ID ${id} no encontrada`);
      }
      return updatedNote;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al actualizar la nota');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedNote = await this.notesService.remove(BigInt(id));
      if (!deletedNote) {
        throw new NotFoundException(`Nota con ID ${id} no encontrada`);
      }
      return deletedNote;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al eliminar la nota');
    }
  }
}
