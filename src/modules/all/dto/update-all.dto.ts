import { PartialType } from '@nestjs/mapped-types';
import { CreateAllDto } from './create-all.dto';
import { IsString, IsInt, IsNotEmpty, Length, IsBoolean } from 'class-validator';

export class UpdateAllDto extends PartialType(CreateAllDto) {
    @IsString({ message: "Se requiere que el titulo no este vacio"})
    @IsNotEmpty({ message: "El se requiere poner"})
    @Length(10,30)
    title: string;  // Título de la nota
    @IsString({ message: "Se requiere que el contenido no este vacio"})
    @IsNotEmpty({ message: "El se requiere poner"})  
    body: string;   // Cuerpo o contenido de la nota
    @IsInt({ message: "Se requiere no estar vacio"})
    @IsNotEmpty({ message: "El se requiere poner"})
    IdUser: bigint;  // ID del usuario dueño de la nota (como BigInt)
    @IsBoolean({ message: "Se reuiere marcar si es favorito o no"})
    @IsNotEmpty({ message: "El se requiere poner"})
    isFavorite?: boolean;   // Indicador opcional de si la nota es favorita

}
