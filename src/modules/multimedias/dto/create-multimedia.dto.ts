import { IsBoolean, IsInt, IsNotEmpty, IsString, IsUrl, Min } from 'class-validator';

export class CreateMultimediaDto {
    
    @IsNotEmpty({ message: 'Este campo de la Id no este vacio' })
    @IsInt({ message: 'Debe ser un entero.' })
    @Min(1, { message: 'El ID debe ser un número positivo.' })
    id: number;

    @IsNotEmpty({ message: 'itIsImage no debe estar vacio' })
    @IsBoolean({ message: 'Debe ser in boleano' })
    itIsImage: Boolean;

    @IsNotEmpty({ message: 'Link no debe estar vacio' })
    @IsString({ message: 'Debe ser un string' })
    @IsUrl({}, { message: 'El Link sea valido' })
    link: String;

    @IsNotEmpty({ message: ' El campo itIsSound no debe estar vacio' })
    @IsString({ message: 'Debe ser un string' })
    @IsUrl({}, { message: 'itIsSound que sea una URL validado' })
    itIsSound: String;


}
