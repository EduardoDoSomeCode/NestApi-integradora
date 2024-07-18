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
  Put,
} from '@nestjs/common';
import { AllService } from './all.service';
import { CreateAllDto } from './dto/create-all.dto';
import { UpdateAllDto } from './dto/update-all.dto';
import { All } from '@prisma/client';

@Controller('all') //Este es el crontolador de All
export class AllController {
  constructor(private readonly allService: AllService) {}

  @Post()
  async create(@Body() createAllDto: CreateAllDto): Promise<any> {
      return this.allService.create(createAllDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.allService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<any> {
    let searchId = BigInt(id)
    const todo = this.allService.findOne(searchId);
    if (!todo) {
      throw new NotFoundException(`La tarea con ID ${id} no se encontró.`);
    }
    return todo;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAllDto: UpdateAllDto): Promise<any> {
    const bigIntId = BigInt(id);
    return this.allService.update(bigIntId, updateAllDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id:  string): Promise<any> {
    let numberToSearch = BigInt(id)
    const result = this.allService.remove(numberToSearch);
    if (!result) {
      throw new NotFoundException(`La tarea con ID ${id} no se encontró.`);
    }
  }
}
