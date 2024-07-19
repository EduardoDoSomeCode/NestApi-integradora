// src/modules/multimedias/multimedias.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MultimediaService } from './multimedias.service'; // Importa el servicio MultimediaService
import { CreateMultimediaDto } from './dto/create-multimedia.dto'; // Importa el DTO para crear multimedia
import { UpdateMultimediaDto } from './dto/update-multimedia.dto'; // Importa el DTO para actualizar multimedia

@Controller('multimedia')
export class MultimediasController {
  constructor(private readonly multimediaService: MultimediaService) {} // Inyecta el servicio MultimediaService

  // Maneja solicitudes POST para crear un nuevo multimedia
  @Post()
  create(@Body() createMultimediaDto: CreateMultimediaDto) {
    return this.multimediaService.create(createMultimediaDto);
  }

  // Maneja solicitudes GET para obtener todos los multimedias
  @Get()
  findAll() {
    return this.multimediaService.findAll();
  }

  // Maneja solicitudes GET para obtener un multimedia específico por ID
  @Get(':id')
  findOne(@Param('id') id: bigint) {
    return this.multimediaService.findOne(id);
  }

  // Maneja solicitudes PUT para actualizar un multimedia específico por ID
  @Put(':id')
  update(@Param('id') id: bigint, @Body() updateMultimediaDto: UpdateMultimediaDto) {
    return this.multimediaService.update(id, updateMultimediaDto);
  }

  // Maneja solicitudes DELETE para eliminar un multimedia específico por ID
  @Delete(':id')
  remove(@Param('id') id: bigint) {
    return this.multimediaService.remove(id);
  }
}

