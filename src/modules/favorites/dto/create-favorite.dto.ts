import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'El ID de la nota asociada al favorito.',
    example: 123, // Proporciona un ejemplo de valor esperado
    type: 'integer', // Indica el tipo de dato esperado
  })
  @IsInt({ message: 'El ID de la nota debe ser un entero.' })
  @IsNotEmpty({ message: 'Se requiere especificar el ID de la nota.' })
  noteId: number; // Cambia bigint a number si Swagger no soporta bigint
}
