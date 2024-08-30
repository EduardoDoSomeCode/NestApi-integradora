import { IsString, IsInt, IsBoolean, IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para crear una nueva nota.
 * Define los campos necesarios para crear una nota en la base de datos.
 */
export class CreateNoteDto {
    @ApiProperty({
        description: 'Título de la nota, entre 10 y 30 caracteres.',
        example: 'Mi nueva nota',
        minLength: 10,
        maxLength: 30
    })
    @IsString({ message: "El título debe ser una cadena de texto." })
    @IsNotEmpty({ message: "El título es obligatorio." })
    @Length(10, 30, { message: 'El título debe tener entre 10 y 30 caracteres.' })
    title: string;  // Título de la nota

    @ApiProperty({
        description: 'Cuerpo o contenido de la nota.',
        example: 'Este es el contenido de mi nueva nota.'
    })
    @IsString({ message: "El cuerpo debe ser una cadena de texto." })
    @IsNotEmpty({ message: "El cuerpo es obligatorio." })
    body: string;   // Cuerpo o contenido de la nota

    @ApiProperty({
        description: 'ID del usuario dueño de la nota.',
        example: 1,
        type: 'integer'
    })
    @IsInt({ message: "El ID del usuario debe ser un número entero." })
    @IsNotEmpty({ message: "El ID del usuario es obligatorio." })
    IdUser: number;  // ID del usuario dueño de la nota (cambiado a `number`)

    @ApiProperty({
        description: 'Indicador de si la nota es favorita.',
        example: false,
        required: false
    })
    @IsBoolean({ message: "El indicador de favorito debe ser booleano." })
    isFavorite?: boolean;   // Indicador opcional de si la nota es favorita
}
