import { PartialType } from '@nestjs/mapped-types';
import { CreateMultimediaDto } from './create-multimedia.dto';

export class UpdateMultimediaDto extends PartialType(CreateMultimediaDto) {
    
    itIsImage?: boolean;
    link?: bigint;
    itIsSound?: bigint;
}
