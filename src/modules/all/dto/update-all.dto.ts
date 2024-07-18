import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length, IsOptional, IsNumberString } from 'class-validator';
import { CreateAllDto } from './create-all.dto';

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