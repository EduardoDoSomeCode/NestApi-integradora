import { IsBoolean, IsNotEmpty, IsString, IsUrl, IsInt } from 'class-validator';

export class CreateMultimediaDto {
    
    @IsNotEmpty({ message: 'El ID no debe estar vacío' })
    @IsInt({ message: 'Debe ser un entero' })
    id: bigint;

    @IsNotEmpty({ message: 'notesId no debe estar vacío' })
    @IsInt({ message: 'Debe ser un entero' })
    notesId: bigint;

    @IsNotEmpty({ message: 'itIsImage no debe estar vacío' })
    @IsBoolean({ message: 'Debe ser un booleano' })
    itIsImage: boolean;

    @IsNotEmpty({ message: 'Link no debe estar vacío' })
    @IsString({ message: 'Debe ser un string' })
    @IsUrl({}, { message: 'El Link debe ser una URL válida' })
    link: string;

    @IsNotEmpty({ message: 'El campo itIsSound no debe estar vacío' })
    @IsString({ message: 'Debe ser un string' })
    @IsUrl({}, { message: 'itIsSound debe ser una URL válida' })
    itIsSound: string;
}
