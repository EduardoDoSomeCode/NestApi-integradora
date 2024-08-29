import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../common/utils/prisma.service';
import { MultimediaService } from './multimedias.service';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';

describe('MultimediaService', () => {
  let service: MultimediaService;
  let prismaService: PrismaService;

  // Simulación del servicio Prisma para imitar las operaciones de la base de datos
  const mockPrismaService = {
    multimedia: {
      create: jest.fn(),    // Método para crear registros
      findMany: jest.fn(),  // Método para obtener múltiples registros
      findUnique: jest.fn(),// Método para obtener un registro específico
      update: jest.fn(),    // Método para actualizar un registro
      delete: jest.fn(),    // Método para eliminar un registro
    },
  };

  beforeEach(async () => {
    // Configuración del entorno de pruebas con el servicio Multimedia y el mock de PrismaService
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MultimediaService, 
        { provide: PrismaService, useValue: mockPrismaService }, // Se proporciona el mock de PrismaService
      ],
    }).compile();

    service = module.get<MultimediaService>(MultimediaService); // Se obtiene la instancia del servicio Multimedia
    prismaService = module.get<PrismaService>(PrismaService); // Se obtiene la instancia del mock de PrismaService
  });

  // Verifica que el servicio Multimedia está correctamente instanciado
  it('El servicio Multimedia debe estar definido', () => {
    expect(service).toBeDefined();
  });

  // Pruebas para el método 'create'
  describe('create', () => {
    it('Debe crear un registro de multimedia', async () => {
      // Datos de prueba para la creación de un registro multimedia
      const createDto: CreateMultimediaDto = {
        id: BigInt(1),
        notesId: BigInt(1),
        itIsImage: true,
        link: 'http://example.com/image.png',
        itIsSound: 'http://example.com/sound.mp3',
      };
      const createdMultimedia = { ...createDto }; // Resultado esperado
      mockPrismaService.multimedia.create.mockResolvedValue(createdMultimedia); // Simula la creación exitosa

      // Verifica que el servicio crea el registro multimedia correctamente
      expect(await service.create(createDto)).toEqual(createdMultimedia);
    });

    it('Debe manejar un error si la creación del registro falla', async () => {
      // Datos de prueba para la creación de un registro multimedia
      const createDto: CreateMultimediaDto = {
        id: BigInt(1),
        notesId: BigInt(1),
        itIsImage: true,
        link: 'http://example.com/image.png',
        itIsSound: 'http://example.com/sound.mp3',
      };
      mockPrismaService.multimedia.create.mockRejectedValue(new Error('Error en la base de datos')); // Simula un error en la creación

      // Verifica que se lanza un error si la creación falla
      await expect(service.create(createDto)).rejects.toThrow('Error al crear el multimedia');
    });
  });

  // Pruebas para el método 'findAll'
  describe('findAll', () => {
    it('Debe retornar un array con todos los registros de multimedia', async () => {
      // Simulación de una lista de registros multimedia
      const multimediaArray = [
        { id: BigInt(1), notesId: BigInt(1), itIsImage: true, link: 'http://example.com/image.png', itIsSound: 'http://example.com/sound.mp3' },
        { id: BigInt(2), notesId: BigInt(2), itIsImage: false, link: 'http://example.com/sound.mp3', itIsSound: 'http://example.com/sound.mp3' },
      ];
      mockPrismaService.multimedia.findMany.mockResolvedValue(multimediaArray); // Simula la obtención exitosa

      // Verifica que el servicio devuelve correctamente la lista de registros multimedia
      expect(await service.findAll()).toEqual(multimediaArray);
    });

    it('Debe manejar un error si la obtención de registros falla', async () => {
      mockPrismaService.multimedia.findMany.mockRejectedValue(new Error('Error en la base de datos')); // Simula un error en la obtención

      // Verifica que se lanza un error si la obtención de registros falla
      await expect(service.findAll()).rejects.toThrow('Error al obtener los multimedia');
    });
  });

  // Pruebas para el método 'findOne'
  describe('findOne', () => {
    it('Debe retornar un registro multimedia por su ID', async () => {
      // Simulación de un registro multimedia específico
      const multimediaRecord = { id: BigInt(1), notesId: BigInt(1), itIsImage: true, link: 'http://example.com/image.png', itIsSound: 'http://example.com/sound.mp3' };
      mockPrismaService.multimedia.findUnique.mockResolvedValue(multimediaRecord); // Simula la obtención exitosa

      // Verifica que el servicio devuelve correctamente el registro multimedia
      expect(await service.findOne(BigInt(1))).toEqual(multimediaRecord);
    });

    it('Debe manejar un error si la obtención del registro por ID falla', async () => {
      mockPrismaService.multimedia.findUnique.mockRejectedValue(new Error('Error en la base de datos')); // Simula un error en la obtención

      // Verifica que se lanza un error si la obtención del registro falla
      await expect(service.findOne(BigInt(1))).rejects.toThrow('Error al obtener el multimedia');
    });
  });

  // Pruebas para el método 'update'
  describe('update', () => {
    it('Debe actualizar un registro multimedia', async () => {
      // Datos de prueba para la actualización de un registro multimedia
      const updateDto: UpdateMultimediaDto = {
        itIsImage: false,
        link: 'http://example.com/new-image.png',
        itIsSound: 'http://example.com/new-sound.mp3',
      };
      const updatedMultimedia = { id: BigInt(1), ...updateDto }; // Resultado esperado
      mockPrismaService.multimedia.update.mockResolvedValue(updatedMultimedia); // Simula la actualización exitosa

      // Verifica que el servicio actualiza correctamente el registro multimedia
      expect(await service.update(BigInt(1), updateDto)).toEqual(updatedMultimedia);
    });

    it('Debe manejar un error si la actualización del registro falla', async () => {
      // Datos de prueba para la actualización de un registro multimedia
      const updateDto: UpdateMultimediaDto = {
        itIsImage: false,
        link: 'http://example.com/new-image.png',
        itIsSound: 'http://example.com/new-sound.mp3',
      };
      mockPrismaService.multimedia.update.mockRejectedValue(new Error('Error en la base de datos')); // Simula un error en la actualización

      // Verifica que se lanza un error si la actualización falla
      await expect(service.update(BigInt(1), updateDto)).rejects.toThrow('Error al actualizar el multimedia');
    });
  });

  // Pruebas para el método 'remove'
  describe('remove', () => {
    it('Debe eliminar un registro multimedia', async () => {
      // Simulación de un registro multimedia eliminado
      const deletedMultimedia = { id: BigInt(1), notesId: BigInt(1), itIsImage: true, link: 'http://example.com/image.png', itIsSound: 'http://example.com/sound.mp3' };
      mockPrismaService.multimedia.delete.mockResolvedValue(deletedMultimedia); // Simula la eliminación exitosa

      // Verifica que el servicio elimina correctamente el registro multimedia
      expect(await service.remove(BigInt(1))).toEqual(deletedMultimedia);
    });

    it('Debe manejar un error si la eliminación del registro falla', async () => {
      mockPrismaService.multimedia.delete.mockRejectedValue(new Error('Error en la base de datos')); // Simula un error en la eliminación

      // Verifica que se lanza un error si la eliminación falla
      await expect(service.remove(BigInt(1))).rejects.toThrow('Error al eliminar el multimedia');
    });
  });
});
