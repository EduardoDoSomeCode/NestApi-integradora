import { Injectable } from '@nestjs/common';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';
import { PrismaService } from '../../common/utils/prisma.service';
import ExceptionBad from 'src/common/utils/ExceptionBad';

export interface multimedia { 
 
  id: number;
  itIsImage: boolean;
  link: string;
  itIsSound: string;
}

@Injectable()
export class MultimediasService {

  private sampleMulti: multimedia[] = [
    {
      id: 1,
      itIsImage: true,
      link: 'https://es.wikipedia.org/wiki/Panzer_VI_Tiger',
      itIsSound: '',
    },
    {
      id: 2,
      itIsImage: false,
      link: 'https://es.wikipedia.org/wiki/Panzer_VI_Tiger',
      itIsSound: '',
    },
    {
      id: 3,
      itIsImage: true,
      link: 'https://es.wikipedia.org/wiki/Panzer_VI_Tiger',
      itIsSound: '',
    },
  ];
  
  
  constructor(private readonly prisma: PrismaService) {}

  create(createMultimediaDto: CreateMultimediaDto) {
    return 'This action adds a new multimedia';
  }

  findAll() {
    return `This action returns all multimedias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} multimedia`;
  }

  update(id: number, updateMultimediaDto: UpdateMultimediaDto) {
    return `This action updates a #${id} multimedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} multimedia`;
  }
}
