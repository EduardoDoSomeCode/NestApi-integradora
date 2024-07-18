import { PartialType } from '@nestjs/mapped-types';
import { CreateQuoteDto } from './create-quote.dto';
import { IsString, Length } from 'class-validator';

export class UpdateQuoteDto {
    @IsString({ message: 'La frase debe ser una cadena de caracteres.' })
    @Length(1, 50, { message: 'La frase debe tener entre 1 y 50 caracteres.' })
    phrase?: string;
  
    @IsString({ message: 'El autor debe ser una cadena de caracteres.' })
    @Length(1, 25, { message: 'El autor debe tener entre 1 y 25 caracteres.' })
    author?: string;
  
    // Si noteId es opcional en UpdateQuoteDto, asegúrate de marcarlo como tal si no es obligatorio
    noteId?: bigint; // El ID de la nota a la que pertenece esta cita
}
