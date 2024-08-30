import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitDto } from './create-habit.dto';
import { IsString, IsNotEmpty, Length, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateHabitDto extends PartialType(CreateHabitDto) {
   
  @ApiPropertyOptional({ description: 'Título del hábito, entre 10 y 30 caracteres.', example: 'Leer un libro diario' })
  @IsString({ message: 'El título debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'Se requiere agregar el título.' })
  @Length(10, 40, { message: 'El título debe tener entre 10 y 30 caracteres.' })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Fecha asociada al hábito.', example: '2024-08-28T00:00:00.000Z' })
  @IsOptional()
  recentDate?: Date; // Permite que la fecha sea opcional al actualizar

  // Campos opcionales
  // @ApiPropertyOptional({ description: 'Descripción adicional del hábito, máximo 100 caracteres.', example: 'Descripción del hábito', required: false })
  // @IsString({ message: 'La descripción debe ser una cadena de caracteres.' })
  // @Length(0, 100, { message: 'La descripción no puede tener más de 100 caracteres.' })
  // description?: string;
}



