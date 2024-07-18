import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe  } from '@nestjs/common';
import { MultimediasService } from './multimedias.service';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';

@Controller('multimedias')
export class MultimediasController {
  constructor(private readonly multimediasService: MultimediasService) {}

  @Post()
  create(@Body() createMultimediaDto: CreateMultimediaDto) {
    return this.multimediasService.create(createMultimediaDto);
  }

  @Get()
  findAll() {
    return this.multimediasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.multimediasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMultimediaDto: UpdateMultimediaDto) {
    return this.multimediasService.update(+id, updateMultimediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.multimediasService.remove(+id);
  }
}
