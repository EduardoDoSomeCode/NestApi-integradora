import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../common/utils/prisma.service';
import { MultimediaService } from './multimedias.service';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';

describe('MultimediaService', () => {
  let service: MultimediaService;
  let prismaService: PrismaService;

  // Mock del servicio Prisma para simular las interacciones con la base de datos
  const mockPrismaService = {
    multimedia: {
      create: jest.fn(),    // Método create
      findMany: jest.fn(),  // Método findMany
      findUnique: jest.fn(),// Método findUnique
      update: jest.fn(),    // Método update
      delete: jest.fn(),    // Método delete
    },
  };

  beforeEach(async () => {
    // Configuración del módulo de pruebas con el servicio Multimedia y el mock de PrismaService
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MultimediaService, 
        { provide: PrismaService, useValue: mockPrismaService }, // Inyecta el mock de PrismaService
      ],
    }).compile();

    service = module.get<MultimediaService>(MultimediaService); // Obtiene el servicio Multimedia
    prismaService = module.get<PrismaService>(PrismaService); // Obtiene el mock de PrismaService
  });

  // Verifica que el servicio Multimedia está definido correctamente
  it('Se define en el servicio Multimedia', () => {
    expect(service).toBeDefined();
  });

  // Pruebas para el método 'create'
  describe('create', () => {
    it('Se crea la multimedia record', async () => {
      // Datos de entrada para crear un registro de multimedia
      const createDto: CreateMultimediaDto = {
        id: BigInt(1),
        notesId: BigInt(1),
        itIsImage: true,
        link: 'http://example.com/image.png',
        itIsSound: 'http://example.com/sound.mp3',
      };
      const createdMultimedia = { ...createDto }; // Resultado esperado
      mockPrismaService.multimedia.create.mockResolvedValue(createdMultimedia); // Simula la creación exitosa

      // Verifica que el servicio crea correctamente el registro de multimedia
      expect(await service.create(createDto)).toEqual(createdMultimedia);
    });

    it('En caso de fallar el registro de multimedia', async () => {
      // Datos de entrada para crear un registro de multimedia
      const createDto: CreateMultimediaDto = {
        id: BigInt(1),
        notesId: BigInt(1),
        itIsImage: true,
        link: 'http://example.com/image.png',
        itIsSound: 'http://example.com/sound.mp3',
      };
      mockPrismaService.multimedia.create.mockRejectedValue(new Error('Database error')); // Simula un error en la creación

      // Verifica que el servicio lanza un error si falla la creación
      await expect(service.create(createDto)).rejects.toThrow('Error al crear el multimedia');
    });
  });

  // Pruebas para el método 'findAll'
  describe('findAll', () => {
    it('Se encuentra todos los datos mediante una array', async () => {
      // Simula un array de registros de multimedia
      const multimediaArray = [
        { id: BigInt(1), notesId: BigInt(1), itIsImage: true, link: 'http://example.com/image.png', itIsSound: 'http://example.com/sound.mp3' },
        { id: BigInt(2), notesId: BigInt(2), itIsImage: false, link: 'http://example.com/sound.mp3', itIsSound: 'http://example.com/sound.mp3' },
      ];
      mockPrismaService.multimedia.findMany.mockResolvedValue(multimediaArray); // Simula la recuperación exitosa

      // Verifica que el servicio devuelve correctamente un array de registros de multimedia
      expect(await service.findAll()).toEqual(multimediaArray);
    });

    it('En caso si no se encuentra los registros', async () => {
      mockPrismaService.multimedia.findMany.mockRejectedValue(new Error('Database error')); // Simula un error en la recuperación

      // Verifica que el servicio lanza un error si falla la recuperación
      await expect(service.findAll()).rejects.toThrow('Error al obtener los multimedia');
    });
  });

  // Pruebas para el método 'findOne'
  describe('findOne', () => {
    it('Se encuentra mediante su Id de Multimedia', async () => {
      // Simula un registro de multimedia único
      const multimediaRecord = { id: BigInt(1), notesId: BigInt(1), itIsImage: true, link: 'http://example.com/image.png', itIsSound: 'http://example.com/sound.mp3' };
      mockPrismaService.multimedia.findUnique.mockResolvedValue(multimediaRecord); // Simula la recuperación exitosa

      // Verifica que el servicio devuelve correctamente un registro de multimedia
      expect(await service.findOne(BigInt(1))).toEqual(multimediaRecord);
    });

    it('En caso si o se encuentra mediante su Id', async () => {
      mockPrismaService.multimedia.findUnique.mockRejectedValue(new Error('Database error')); // Simula un error en la recuperación

      // Verifica que el servicio lanza un error si falla la recuperación
      await expect(service.findOne(BigInt(1))).rejects.toThrow('Error al obtener el multimedia');
    });
  });

  // Pruebas para el método 'update'
  describe('update', () => {
    it('Se actualiza el regsitro de multimedia', async () => {
      // Datos de entrada para actualizar un registro de multimedia
      const updateDto: UpdateMultimediaDto = {
        itIsImage: false,
        link: 'http://example.com/new-image.png',
        itIsSound: 'http://example.com/new-sound.mp3',
      };
      const updatedMultimedia = { id: BigInt(1), ...updateDto }; // Resultado esperado
      mockPrismaService.multimedia.update.mockResolvedValue(updatedMultimedia); // Simula la actualización exitosa

      // Verifica que el servicio actualiza correctamente el registro de multimedia
      expect(await service.update(BigInt(1), updateDto)).toEqual(updatedMultimedia);
    });

    it('Si fallo el registro de actualización', async () => {
      // Datos de entrada para actualizar un registro de multimedia
      const updateDto: UpdateMultimediaDto = {
        itIsImage: false,
        link: 'http://example.com/new-image.png',
        itIsSound: 'http://example.com/new-sound.mp3',
      };
      mockPrismaService.multimedia.update.mockRejectedValue(new Error('Database error')); // Simula un error en la actualización

      // Verifica que el servicio lanza un error si falla la actualización
      await expect(service.update(BigInt(1), updateDto)).rejects.toThrow('Error al actualizar el multimedia');
    });
  });

  // Pruebas para el método 'remove'
  describe('remove', () => {
    it('Se elimina un registro de Multimedia', async () => {
      // Simula un registro de multimedia eliminado
      const deletedMultimedia = { id: BigInt(1), notesId: BigInt(1), itIsImage: true, link: 'http://example.com/image.png', itIsSound: 'http://example.com/sound.mp3' };
      mockPrismaService.multimedia.delete.mockResolvedValue(deletedMultimedia); // Simula la eliminación exitosa

      // Verifica que el servicio elimina correctamente el registro de multimedia
      expect(await service.remove(BigInt(1))).toEqual(deletedMultimedia);
    });

    it('Si falla la eliminación del registro', async () => {
      mockPrismaService.multimedia.delete.mockRejectedValue(new Error('Database error')); // Simula un error en la eliminación

      // Verifica que el servicio lanza un error si falla la eliminación
      await expect(service.remove(BigInt(1))).rejects.toThrow('Error al eliminar el multimedia');
    });
  });
});