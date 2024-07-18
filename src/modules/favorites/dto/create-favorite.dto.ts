import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateFavoriteDto {
  @IsInt({ message: 'El ID de la nota debe ser un entero.' })
  @IsNotEmpty({ message: 'Se requiere especificar el ID de la nota.' })
  noteId: bigint; // Asegúrate de usar bigint si es necesario según tu base de datos
}