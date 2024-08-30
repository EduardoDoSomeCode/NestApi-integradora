import { IsString, Min, IsNotEmpty, Length, IsDate, IsInt } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

// DTO para la creación de un nuevo hábito
export class CreateHabitDto {
  @ApiProperty({ description: 'Identificador único asociado al hábito.', example: 1 })
  @IsInt({ message: 'El userId debe ser un entero.' })
  @IsNotEmpty({ message: 'Se requiere agregar el userId.' })
  @Min(1, { message: 'El userId debe ser un número positivo.' })
  id: number;
  @ApiProperty({ description: 'Identificador único del usuario asociado al hábito.', example: 1 })
  @IsInt({ message: 'El userId debe ser un entero.' })
  @IsNotEmpty({ message: 'Se requiere agregar el userId.' })
  @Min(1, { message: 'El userId debe ser un número positivo.' })
  userId: number; // Cambiado de bigint a number para compatibilidad con Swagger

  @ApiProperty({ description: 'Título del hábito, entre 10 y 30 caracteres.', example: 'Tomar dos veces Creatina' })
  @IsString({ message: 'El título debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'Se requiere agregar el título.' })
  @Length(10, 40, { message: 'El título debe tener entre 10 y 30 caracteres.' })
  title: string;

  @ApiProperty({ description: 'Fecha asociada al hábito.', example: '2024-08-28T00:00:00.000Z' })
  @IsNotEmpty({ message: 'Se requiere agregar la fecha.' })
  recentDate: Date; // Fecha asociada al hábito

  // Campos opcionales
  // @ApiProperty({ description: 'Descripción adicional del hábito, máximo 100 caracteres.', example: 'Descripción del hábito', required: false })
  // @IsString({ message: 'La descripción debe ser una cadena de caracteres.' })
  // @Length(0, 100, { message: 'La descripción no puede tener más de 100 caracteres.' })
  // description?: string;
}





