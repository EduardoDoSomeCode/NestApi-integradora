import { IsNotEmpty, IsString, Length, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAllDto {
  // Valida que el campo id sea un BigInt, no esté vacío, y sea un número positivo
  @ApiProperty({
    description: 'Identificador único para el recurso, debe ser un entero positivo.',
    example: 12345,
    type: Number,
  })
  @IsInt({ message: 'El id debe ser un entero.' })
  @IsNotEmpty({ message: 'Se requiere agregar el id.' })
  idAll: number;

  // Valida que el campo userId sea un BigInt, no esté vacío, y sea un número positivo
  @ApiProperty({
    description: 'Identificador del usuario asociado, debe ser un entero positivo.',
    example: 67890,
    type: Number,
  })
  @IsInt({ message: 'El userId debe ser un entero.' })
  @IsNotEmpty({ message: 'Se requiere agregar el userId.' })
  userId: number;

  // Valida que el campo title sea una cadena de caracteres, no esté vacío, y tenga entre 10 y 30 caracteres
  @ApiProperty({
    description: 'Título descriptivo del recurso, debe contener entre 10 y 30 caracteres.',
    example: 'Título de ejemplo',
    type: String,
  })
  @IsString({ message: 'El título debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'Se requiere agregar el título.' })
  @Length(10, 30, { message: 'El título debe tener entre 10 y 30 caracteres.' })
  title: string;
}
