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

  private sampleMulti: multimedia[] = [
    {
      id: 1,
      itIsImage: true,
      link: BigInt(1234567890123456789),
      itIsSound: BigInt(9876543210987654321),
    },
    {
      id: 2,
      itIsImage: false,
      link: BigInt(2345678901234567890),
      itIsSound: BigInt(765432109876543210),
    },
    {
      id: 3,
      itIsImage: true,
      link: BigInt(3456789012345678901),
      itIsSound: BigInt(7654321098765432109),
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
