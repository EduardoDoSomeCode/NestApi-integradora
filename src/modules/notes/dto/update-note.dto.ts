
import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  /**
   * DTO parcial para actualizar una nota existente.
   * Extiende el DTO de creación y permite actualizar parcialmente los campos de una nota.
   */

  @ApiPropertyOptional({ description: 'Nuevo título de la nota (opcional)', example: 'Mi nueva nota' })
  title?: string; // Nuevo título de la nota (opcional)

  @ApiPropertyOptional({ description: 'Nuevo cuerpo o contenido de la nota (opcional)', example: 'Este es el contenido actualizado de la nota' })
  body?: string;  // Nuevo cuerpo o contenido de la nota (opcional)

  @ApiPropertyOptional({ description: 'Indica si la nota es favorita (opcional)', example: true })
  isFavorite?: boolean;   // Nuevo indicador opcional de si la nota es favorita
}
