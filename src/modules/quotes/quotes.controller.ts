import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('quotes') // Agrupa las rutas bajo la etiqueta 'quotes' en la documentación de Swagger.
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cita' }) // Describe la operación en la documentación de Swagger.
  @ApiResponse({ status: 201, description: 'La cita ha sido creada exitosamente.' }) // Respuesta esperada en caso de éxito.
  @ApiResponse({ status: 400, description: 'Datos inválidos para crear una cita.' }) // Respuesta esperada en caso de datos inválidos.
  @ApiBody({ description: 'Datos requeridos para crear una cita', type: CreateQuoteDto }) // Define la estructura del cuerpo de la solicitud.
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cita por su ID' }) // Describe la operación en la documentación de Swagger.
  @ApiParam({ name: 'id', description: 'ID de la cita', type: String }) // Define el parámetro 'id' para la documentación.
  @ApiResponse({ status: 200, description: 'Cita encontrada exitosamente.' }) // Respuesta esperada en caso de éxito.
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' }) // Respuesta esperada en caso de cita no encontrada.
  findOne(@Param('id') id: string) {
    return this.quotesService.findById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una cita por su ID' }) // Describe la operación en la documentación de Swagger.
  @ApiParam({ name: 'id', description: 'ID de la cita', type: String }) // Define el parámetro 'id' para la documentación.
  @ApiResponse({ status: 200, description: 'Cita actualizada exitosamente.' }) // Respuesta esperada en caso de éxito.
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' }) // Respuesta esperada en caso de cita no encontrada.
  @ApiBody({ description: 'Datos requeridos para actualizar una cita', type: UpdateQuoteDto }) // Define la estructura del cuerpo de la solicitud.
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    let idNumber = parseInt(id);
    return this.quotesService.update(idNumber, updateQuoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una cita por su ID' }) // Describe la operación en la documentación de Swagger.
  @ApiParam({ name: 'id', description: 'ID de la cita', type: String }) // Define el parámetro 'id' para la documentación.
  @ApiResponse({ status: 200, description: 'Cita eliminada exitosamente.' }) // Respuesta esperada en caso de éxito.
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' }) // Respuesta esperada en caso de cita no encontrada.
  remove(@Param('id') id: string) {
    return this.quotesService.remove(+id);
  }
}
