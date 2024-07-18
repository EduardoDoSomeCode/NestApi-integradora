import { Injectable } from '@nestjs/common';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';
import { PrismaService } from '../../common/utils/prisma.service';
import ExceptionBad from 'src/common/utils/ExceptionBad';

export interface multimedia { 
 
  id: number;
  itIsImage: boolean;
  link: bigint;
  itIsSound: bigint;
}

@Injectable()
export class MultimediasService {
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
