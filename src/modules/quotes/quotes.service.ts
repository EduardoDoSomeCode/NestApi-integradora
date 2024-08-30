import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { PrismaService } from 'src/prisma.services';

@Injectable()
export class QuotesService {

  constructor(private prisma: PrismaService) {}

  async create(createQuoteDto: CreateQuoteDto) {
    // Verificar si el noteId existe en la tabla Notes
    const noteExists = await this.prisma.notes.findUnique({
      where: { idNotes: BigInt(createQuoteDto.noteId) }, // Asegúrate de convertir a BigInt si es necesario
    });
  
    if (!noteExists) {
      throw new Error('El noteId proporcionado no existe en la base de datos.');
    }
  
    // Si existe, crear la cita
    return this.prisma.quotes.create({
      data: {
        phrase: createQuoteDto.phrase,
        author: createQuoteDto.author,
        noteId: createQuoteDto.noteId,
      },
    });
  }
  

  async findById(id: number) {
    return this.prisma.quotes.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto) {
    try {
      const updatedQuote = await this.prisma.quotes.update({
        where: { id },
        data: updateQuoteDto,
      });
      return updatedQuote;
    } catch (error) {
      throw new NotFoundException(`La cita con ID ${id} no se encontró.`);
    }
  }

  async remove(id: number) {
    return this.prisma.quotes.delete({
      where: { id },
    });
  }
}