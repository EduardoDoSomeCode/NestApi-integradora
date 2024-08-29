import { Test, TestingModule } from '@nestjs/testing';
import { MultimediasController } from '../src/modules/multimedias/multimedias.controller';
import { MultimediaService } from '../src/modules/multimedias/multimedias.service';
import type MockedMultimediaService from '../src/modules/multimedias/type.multimedia';

describe('MultimediaController', () => {
  let controller: MultimediasController;
  let service: MockedMultimediaService;

  beforeEach(async () => {
    const multimediaMock: MockedMultimediaService = {
      create: jest.fn(),
      findAllMultimedia: jest.fn(),
      findMultimediaById: jest.fn(),
      updateMultimedia: jest.fn(),
      deleteMultimedia: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultimediasController],
      providers: [
        { provide: MultimediaService, useValue: multimediaMock },
      ],
    }).compile();

    controller = module.get<MultimediasController>(MultimediasController);
    service = module.get<MultimediaService>(MultimediaService) as unknown as MockedMultimediaService;
  });

  it('should create a new multimedia', async () => {
    const mockMultimedia = {
      id: BigInt(1),
      notesId: BigInt(1),
      itIsImage: true,
      link: 'http://example.com/image.png',
      itIsSound: 'http://example.com/sound.mp3',
    };

    service.create.mockResolvedValueOnce(mockMultimedia);

    const result = await controller.create({
      id: BigInt(1),
      notesId: BigInt(1),
      itIsImage: true,
      link: 'http://example.com/image.png',
      itIsSound: 'http://example.com/sound.mp3',
    });

    expect(result).toEqual(mockMultimedia);
  });

  // Add other tests following the same pattern
});