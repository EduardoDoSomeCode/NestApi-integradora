// Importamos PartialType desde '@nestjs/mapped-types' para crear un DTO parcial y el DTO base para actualizar una nota
import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

// Definimos el DTO para actualizar una nota, extendiendo el DTO de creación
export class UpdateNoteDto extends PartialType(CreateNoteDto) {
    /**
   * DTO parcial para actualizar una nota existente.
   * Extiende el DTO de creación y permite actualizar parcialmente los campos de una nota.
   */
    title?: string; // Nuevo título de la nota (opcional)
    body?: string;  // Nuevo cuerpo o contenido de la nota (opcional)
    isFavorite?: boolean;   // Nuevo indicador opcional de si la nota es favorita
}
