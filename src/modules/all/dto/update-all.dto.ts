import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length, IsOptional, IsNumberString } from 'class-validator';
import { CreateAllDto } from './create-all.dto';
import { IsString, IsInt, IsNotEmpty, Length, IsBoolean } from 'class-validator';

<<<<<<< HEAD
// La clase UpdateAllDto hereda de CreateAllDto y marca todos los campos como opcionales
export class UpdateAllDto extends PartialType(CreateAllDto) {
  // Valida que el campo id, si se proporciona, sea un BigInt, y sea un número positivo
  @IsNumberString({ no_symbols: true }, { message: 'El id debe ser un entero.' })
  @IsOptional()
  id?: bigint;

  // Valida que el campo userId, si se proporciona, sea un BigInt, y sea un número positivo
  @IsNumberString({ no_symbols: true }, { message: 'El userId debe ser un entero.' })
  @IsOptional()
  userId?: bigint;

  // Valida que el campo title, si se proporciona, sea una cadena de caracteres, y tenga entre 10 y 30 caracteres
  @IsString({ message: 'El título debe ser una cadena de caracteres.' })
  @Length(10, 30, { message: 'El título debe tener entre 10 y 30 caracteres.' })
  @IsOptional()
  title?: string;
}
=======
export class UpdateAllDto extends PartialType(CreateAllDto) {
    @IsString({ message: "Se requiere que el titulo no este vacio"})
    @IsNotEmpty({ message: "El se requiere poner"})
    @Length(10,30)
    title: string;  // Título de la nota
    @IsString({ message: "Se requiere que el contenido no este vacio"})
    @IsNotEmpty({ message: "El se requiere poner"})  
    body: string;   // Cuerpo o contenido de la nota
    @IsInt({ message: "Se requiere el ID no este vacio"})
    @IsNotEmpty({ message: "El se requiere poner"})
    IdUser: bigint;  // ID del usuario dueño de la nota (como BigInt)
    @IsBoolean({ message: "Se requiere marcar si es favorito o no"})
    @IsNotEmpty({ message: "El se requiere poner"})
    isFavorite?: boolean;   // Indicador opcional de si la nota es favorita

}
>>>>>>> 6376f00cdb0aebf197130b7618c532fe2a3b3769
