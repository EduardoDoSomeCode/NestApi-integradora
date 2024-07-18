import { PartialType } from '@nestjs/mapped-types';
import { CreateMultimediaDto } from './create-multimedia.dto';
import { IsString, Length } from 'class-validator';

export class UpdateMultimediaDto extends PartialType(CreateMultimediaDto) {
    
    itIsImage?: Boolean;
    link?: String;
    itIsSound?: String;
}
