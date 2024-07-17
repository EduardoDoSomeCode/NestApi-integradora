import { IsString, Min, Max, IsNotEmpty, Length, IsDate } from "class-validator";

// DTO para la creación de un nuevo hábito
export class CreateHabitDto {
  
  @IsNotEmpty({ message: 'Se requiere agregar el userId.' }) //No debe estar vacío
  @Min(1, { message: 'El userId debe ser un número positivo.' }) // Debe ser mayor o igual a 1
  userId: bigint; //Identificador único del usuario asociado al hábito
  
  @IsString({ message: 'El título debe ser una cadena de caracteres.' }) // Validación: el título debe ser una cadena de caracteres
  @IsNotEmpty({ message: 'Se requiere agregar el título.' }) //El título no debe estar vacío
  @Length(10, 30, { message: 'El título debe tener entre 10 y 30 caracteres.' }) // Debe tener entre 10 y 30 caracteres de longitud
  title: string; // Título del hábito
  
  @IsDate({ message: 'La fecha debe ser una fecha válida.' }) // Validación: la fecha debe ser una fecha válida
  @IsNotEmpty({ message: 'Se requiere agregar la fecha.' }) // No debe estar vacía
  date: Date; // Fecha asociada al hábito
  
  @IsString({ message: 'La descripción debe ser una cadena de caracteres.' }) //La descripción debe ser una cadena de caracteres
  @Length(0, 100, { message: 'La descripción no puede tener más de 100 caracteres.' }) // La descripción no puede tener más de 100 caracteres
  description?: string; // Propiedad opcional: Adicional del hábito
}




