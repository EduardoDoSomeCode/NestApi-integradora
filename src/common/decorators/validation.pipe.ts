import { PipeTransform, Injectable, ArgumentMetadata, HttpException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
    // Retorna el valor si no requiere validación
    if (!metatype || !this.toValidate(metatype)) {
        return value;
    }

    // Convierte a una instancia de clase y valida
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    // Lanza una excepción si hay errores
    if (errors.length > 0) {
        throw new HttpException(
        {
            message: 'Los datos no son correctos',
            errors
        },
        400
        );
    }

    return value; // Retorna el valor validado
    }

  // Determina si el tipo necesita validación
    private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
    }
}
