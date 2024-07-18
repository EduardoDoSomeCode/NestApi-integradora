import { BadRequestException } from "@nestjs/common";
// Función que maneja excepciones específicas de errores de base de datos
export default function  ExceptionBad (code: string, error: Error, meta: any){
// Se evalúa el código de error y se lanza una excepción con el mensaje correspondiente
    switch(code){
        case 'P1000':
        throw new BadRequestException({
            message: 'Error de autenticación en el servidor de base de datos en {database_host}',
            meta
        });
        case 'P1001':
            throw new BadRequestException({
            message: 'No se puede acceder al servidor de la base de datos en {database_host}:{database_port}',
            meta   
        });
        case 'P1002':
            throw new BadRequestException({
            message: 'Se alcanzó el servidor de base de datos en {database_host}:{database_port} pero se agotó el tiempo de espera',
            meta
        });
        case 'P1003':
            throw new BadRequestException({
            message: 'La base de datos {database_file_name} no existe en {database_file_path}',
            meta
        });
        case 'P1008':
        throw new BadRequestException({
            message: 'Las operaciones expiraron',
            meta
        });
        case 'P1010':
        throw new BadRequestException({
            message: 'Al usuario {database_user} se le negó el acceso a la base de datos',
            meta
        });
        case 'P1013':
        throw new BadRequestException({
            message: 'La cadena de base de datos proporcionada no es válida',
            meta
        });
        case 'P1017':
        throw new BadRequestException({
            message: 'El servidor ha cerrado la conexión',
            meta
        });
        case 'P2000':
        throw new BadRequestException({
            message: 'El valor proporcionado para la columna es demasiado largo para el tipo de columna',
            meta
        });
        case 'P2001':
        throw new BadRequestException({
            message: 'El registro buscado en la condición donde ({model_name}.{argument_name} = {argument_value}) no existe',
            meta
        });
        case 'P2002':
        throw new BadRequestException({
            message: 'La restricción de clave externa falló en el campo',
            meta
        });
        case 'P2003':
        throw new BadRequestException({
            message: 'La restricción de clave externa falló en el campo',
            meta
        });
        case 'P2004':
        throw new BadRequestException({
            message: 'Una restricción falló en la base de datos',
            meta
        });
        case 'P2007':
        throw new BadRequestException({
            message: 'Error de validación de datos',
            meta
        });
        default: // Caso por defecto para errores no manejados específicamente
            throw new BadRequestException(`No se puede hacer función para la petición. Error: ${error.message}`);

        
    }
}