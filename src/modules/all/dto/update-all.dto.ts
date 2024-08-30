import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateAllDto } from './create-all.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAllDto extends PartialType(CreateAllDto) {
  @ApiProperty({
    description: 'Título de la nota, debe contener entre 10 y 30 caracteres.',
    example: 'Nuevo título de la nota',
    type: String,
  })
  @IsString({ message: 'El título debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'Se requiere agregar el título.' })
  @Length(10, 30, { message: 'El título debe tener entre 10 y 30 caracteres.' })
  title: string;  // Título de la nota
  
  @ApiProperty({
    description: 'Contenido o cuerpo de la nota.',
    example: 'Este es el contenido de la nota.',
    type: String,
  })
  @IsString({ message: 'El contenido debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'Se requiere agregar el contenido.' })
  body: string;  // Cuerpo o contenido de la nota

  @ApiProperty({
    description: 'ID del usuario dueño de la nota.',
    example: 12345678901234567890,
    type: Number,
  })
  @IsInt({ message: 'El ID de usuario debe ser un entero.' })
  @IsNotEmpty({ message: 'Se requiere agregar el ID del usuario.' })
  IdUser: number;  // ID del usuario dueño de la nota (como número entero)
  
  @ApiProperty({
    description: 'Indicador opcional de si la nota es favorita.',
    example: true,
    type: Boolean,
    required: false,
  })
  @IsBoolean({ message: 'El valor de "es favorito" debe ser un booleano.' })
  @IsNotEmpty({ message: 'Se requiere indicar si es favorito o no.' })
  isFavorite?: boolean;  // Indicador opcional de si la nota es favorita
}
