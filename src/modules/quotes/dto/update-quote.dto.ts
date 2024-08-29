import { IsString, Length, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class UpdateQuoteDto {
  @ApiPropertyOptional({ 
    description: 'La frase de la cita', 
    example: 'La persistencia es la clave del éxito.', 
    minLength: 1, 
    maxLength: 150 
  })
  @IsString({ message: 'La frase debe ser una cadena de caracteres.' })
  @Length(1, 150, { message: 'La frase debe tener entre 1 y 50 caracteres.' })
  @IsOptional()
  phrase?: string;

  @ApiPropertyOptional({ 
    description: 'El autor de la cita', 
    example: 'Napoleon Hill', 
    minLength: 1, 
    maxLength: 50 
  })
  @IsString({ message: 'El autor debe ser una cadena de caracteres.' })
  @Length(1, 50, { message: 'El autor debe tener entre 1 y 25 caracteres.' })
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({ 
    description: 'ID de la nota asociada a la cita', 
    example: 1, 
    type: 'integer' 
  })
  @IsOptional()
  noteId?: bigint; // El ID de la nota a la que pertenece esta cita
}
