import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitDto } from './create-habit.dto';
import { IsString, IsNotEmpty, Length, IsOptional, IsDate } from "class-validator";


export class UpdateHabitDto extends PartialType(CreateHabitDto) {
    
   // Decoradores para validar el título
   @IsString({ message: 'El título debe ser una cadena de caracteres.' })
   @IsNotEmpty({ message: 'Se requiere agregar el título.' })
   @Length(10, 30, { message: 'El título debe tener entre 10 y 30 caracteres.' })
   @IsOptional() // Permite que el título sea opcional al actualizar
   title?: string;
 
   // Decoradores para validar la fecha
   @IsDate({ message: 'La fecha debe ser una fecha válida.' })
   @IsNotEmpty({ message: 'Se requiere agregar la fecha.' })
   date: Date;
 
   // Decoradores para validar la descripción
   @IsString({ message: 'La descripción debe ser una cadena de caracteres.' })
   @IsOptional() // Permite que la descripción sea opcional al actualizar
   @Length(0, 100, { message: 'La descripción no puede tener más de 100 caracteres.' })
   description?: string;
}



