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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('all')
@Controller('all') //Este es el crontolador de All
export class AllController {
  constructor(private readonly allService: AllService) {}
  @Post()
  @ApiOperation({summary:'Crear un nuevo todo - all'})
  @ApiResponse({status:200, description: 'El todo ha sido creado'})
  @ApiResponse({status:400, description: 'El todo no ha sido creado'})
  @ApiBody({description:'Se require de un texto , ademas de un id', type:CreateAllDto})  
  async create(@Body() createAllDto: CreateAllDto): Promise<any> {
      return this.allService.create(createAllDto);
  }

  @Get()
  @ApiOperation({summary:'Obtiene todos los todos - all'})
  @ApiResponse({status:200, description: 'Se han encontrado los todos'})
  @ApiResponse({status:404, description: 'No hay respuesta del todo'})
  async findAll(): Promise<any> {
    return this.allService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'Obtiene un todo por su Id'})
  @ApiParam({ name: 'id', description: 'ID del todo', type: String }) // Descripción del parámetro de ruta
  @ApiResponse({status:200, description: 'Se han encontrado el todo con el Id'})
  @ApiResponse({status:404, description: 'No hay respuesta del todo'})
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<any> {
    let searchId = BigInt(id)
    const todo = this.allService.findOne(searchId);
    if (!todo) {
      throw new NotFoundException(`La tarea con ID ${id} no se encontró.`);
    }
    return todo;
  }

  @Put(':id')
  @ApiOperation({summary:'Actualiza un todo por su Id'})
  @ApiParam({ name: 'id', description: 'ID del todo', type: Number }) // Descripción del parámetro de ruta
  @ApiResponse({status:200, description: 'Se han modificado el todo con el ID'})
  @ApiResponse({status:404, description: 'No hay respuesta del todo'})
  async update(@Param('id') id: string, @Body() updateAllDto: UpdateAllDto): Promise<any> {
    const bigIntId = BigInt(id);
    return this.allService.update(bigIntId, updateAllDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'Elimina un  todo por su Id'})
  @ApiParam({ name: 'id', description: 'ID del todo', type: Number }) // Descripción del parámetro de ruta
  @ApiResponse({status:200, description: 'Se han eliminado  el todo con el ID'})
  @ApiResponse({status:404, description: 'No hay respuesta del todo'})
  async remove(@Param('id', ParseIntPipe) id:  string): Promise<any> {
    let numberToSearch = BigInt(id)
    const result = this.allService.remove(numberToSearch);
    if (!result) {
      throw new NotFoundException(`La tarea con ID ${id} no se encontró.`);
    }
  }
}