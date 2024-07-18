import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { AllService } from './all.service';
import { CreateAllDto } from './dto/create-all.dto';
import { UpdateAllDto } from './dto/update-all.dto';
import { All } from '@prisma/client';

@Controller('all') //Este es el crontolador de All
export class AllController {
  constructor(private readonly allService: AllService) {}

  @Post()
  async create(@Body() createAllDto: CreateAllDto): Promise<All> {
    return this.allService.create(createAllDto);
  }

  @Get()
  async findAll(): Promise<All[]> {
    return this.allService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: bigint): Promise<All> {
    const todo = await this.allService.findOne(id);
    if (!todo) {
      throw new NotFoundException(`La tarea con ID ${id} no se encontró.`);
    }
    return todo;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: bigint,
    @Body() updateAllDto: UpdateAllDto,
  ): Promise<All> {
    const updatedTodo = await this.allService.update(id, updateAllDto);
    if (!updatedTodo) {
      throw new NotFoundException(`La tarea con ID ${id} no se encontró.`);
    }
    return updatedTodo;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: bigint): Promise<void> {
    const result = await this.allService.remove(id);
    if (!result) {
      throw new NotFoundException(`La tarea con ID ${id} no se encontró.`);
    }
  }
}
