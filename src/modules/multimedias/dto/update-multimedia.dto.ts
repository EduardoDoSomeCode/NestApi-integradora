import { PartialType } from '@nestjs/mapped-types';
import { CreateMultimediaDto } from './create-multimedia.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateMultimediaDto extends PartialType(CreateMultimediaDto) {
    
  @IsOptional()
  @IsNotEmpty({ message: 'itIsImage no debe estar vacio' })
  @IsBoolean({ message: 'Debe ser un booleano' })
  itIsImage?: boolean;

  @IsOptional()
  @IsString({ message: 'Debe ser un string' })
  @IsNotEmpty({ message: 'No debe estar vacio este campo' })
  @IsUrl({}, { message: 'El Link debe ser válido' })
  link?: string;

  @IsOptional()
  @IsString({ message: 'Debe ser un string' })
  @IsNotEmpty({ message: 'No debe estar vacio este campo' })
  @IsUrl({}, { message: 'itIsSound debe ser una URL válida' })
  itIsSound?: string;
}
