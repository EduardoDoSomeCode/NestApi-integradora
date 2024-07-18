import { IsString, Length } from 'class-validator';

export class CreateMultimediaDto {

    id: BigInt;
    itIsImage: Boolean;
    link: String;
    itIsSound: String;


}
