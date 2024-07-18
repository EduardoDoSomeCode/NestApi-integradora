import { Test, TestingModule } from '@nestjs/testing';
import { MultimediasController } from './multimedias.controller';
import { MultimediasService } from './multimedias.service';

describe('MultimediasController', () => {
  let controller: MultimediasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultimediasController],
      providers: [MultimediasService],
    }).compile();

    controller = module.get<MultimediasController>(MultimediasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
