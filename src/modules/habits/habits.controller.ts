import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Habits } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('habits') // Agrupa las rutas bajo la etiqueta 'habits' en la documentación de Swagger.
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {} // Inyecta el servicio HabitsService para manejar la lógica del negocio.

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo hábito' }) // Describe la operación en la documentación de Swagger.
  @ApiResponse({ status: 201, description: 'El hábito ha sido creado exitosamente.' }) // Respuesta esperada en caso de éxito.
  @ApiResponse({ status: 400, description: 'Datos inválidos para crear un hábito.' }) // Respuesta esperada en caso de datos inválidos.
  @ApiBody({ description: 'Datos requeridos para crear un hábito', type: CreateHabitDto }) // Define la estructura del cuerpo de la solicitud.
  async create(@Body() createHabitDto: CreateHabitDto): Promise<Habits> {
    // Convierte el campo recentDate a un objeto de tipo Date.
    createHabitDto.recentDate = new Date(createHabitDto.recentDate);
    // Llama al servicio para crear un nuevo hábito.
    return this.habitsService.create(createHabitDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un hábito por su ID' })
  @ApiParam({ name: 'id', description: 'ID del hábito', type: String }) // Define el parámetro 'id' para la documentación.
  @ApiResponse({ status: 200, description: 'Hábito encontrado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Hábito no encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Habits> {
    // Convierte el ID a BigInt.
    const bigIntId = BigInt(id);
    // Llama al servicio para buscar el hábito por ID.
    const habit = await this.habitsService.findOne(bigIntId);
    // Si no se encuentra, lanza una excepción 404.
    if (!habit) {
      throw new NotFoundException(`Hábito con ID ${id} no se encontró.`);
    }
    return habit; // Devuelve el hábito encontrado.
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un hábito por su ID' })
  @ApiParam({ name: 'id', description: 'ID del hábito', type: String })
  @ApiResponse({ status: 200, description: 'Hábito actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Hábito no encontrado.' })
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateHabitDto: UpdateHabitDto): Promise<Habits> {
    // Convierte el ID a BigInt.
    const bigIntId = BigInt(id);
    // Llama al servicio para actualizar el hábito con los datos proporcionados.
    return this.habitsService.update(bigIntId, updateHabitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un hábito por su ID' })
  @ApiParam({ name: 'id', description: 'ID del hábito', type: String })
  @ApiResponse({ status: 200, description: 'Hábito eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Hábito no encontrado.' })
  async remove(@Param('id', ParseIntPipe) id: string): Promise<Habits> {
    // Convierte el ID a BigInt.
    const bigIntId = BigInt(id);
    // Llama al servicio para eliminar el hábito por ID.
    const result = await this.habitsService.remove(bigIntId);
    // Si no se encuentra, lanza una excepción 404.
    if (!result) {
      throw new NotFoundException(`Hábito con ID ${id} no se encontró.`);
    }
    return result; // Devuelve el hábito eliminado.
  }
}
