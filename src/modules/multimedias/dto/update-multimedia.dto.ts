import { PartialType } from '@nestjs/mapped-types';
import { CreateMultimediaDto } from './create-multimedia.dto';
import { IsBoolean, IsOptional, IsString, IsUrl} from 'class-validator';

export class UpdateMultimediaDto extends PartialType(CreateMultimediaDto) {
    
    @IsOptional()
    @IsBoolean({ message: 'Debe ser un booleano' })
    itIsImage?: boolean;

    @IsOptional()
    @IsString({ message: 'Debe ser un string' })
    @IsUrl({}, { message: 'El Link debe ser una URL válida' })
    link?: string;

    @IsOptional()
    @IsString({ message: 'Debe ser un string' })
    @IsUrl({}, { message: 'itIsSound debe ser una URL válida' })
    itIsSound?: string;
}
