import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { PrismaService } from 'src/prisma.services';

@Injectable()
export class QuotesService {

  constructor(private prisma: PrismaService) {}

  async create(createQuoteDto: CreateQuoteDto) {
    return this.prisma.quotes.create({
      data: createQuoteDto,
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