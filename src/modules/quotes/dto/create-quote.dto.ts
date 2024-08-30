import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty({ 
    description: 'La frase de la cita', 
    example: 'El éxito es la suma de pequeños esfuerzos repetidos día tras día.', 
    minLength: 1, 
    maxLength: 150 
  })
  @IsString({ message: 'La frase debe ser una cadena de caracteres.' })
  @Length(1, 150, { message: 'La frase debe tener entre 1 y 50 caracteres.' })
  phrase: string;

  @ApiProperty({ 
    description: 'El autor de la cita', 
    example: 'Robert Collier', 
    minLength: 1, 
    maxLength: 50 
  })
  @IsString({ message: 'El autor debe ser una cadena de caracteres.' })
  @Length(1, 50, { message: 'El autor debe tener entre 1 y 25 caracteres.' })
  author: string;

  @ApiProperty({ 
    description: 'ID de la nota asociada a la cita', 
    example: 1, 
    type: 'integer' 
  })
  noteId: bigint; // El ID de la nota a la que pertenece esta cita
}

