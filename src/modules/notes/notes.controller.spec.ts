import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotFoundException } from '@nestjs/common';

describe('NotesController', () => {
  let controller: NotesController;
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 1, title: 'Nota de prueba', body: 'Cuerpo de prueba', IdUser: BigInt(1), isFavorite: false }),
            findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Nota de prueba', body: 'Cuerpo de prueba', IdUser: BigInt(1), isFavorite: false }]),
            findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Nota de prueba', body: 'Cuerpo de prueba', IdUser: BigInt(1), isFavorite: false }),
            update: jest.fn().mockResolvedValue({ id: 1, title: 'Nota de prueba actualizada', body: 'Cuerpo de prueba actualizado', IdUser: BigInt(1), isFavorite: true }),
            remove: jest.fn().mockResolvedValue({ id: 1, title: 'Nota de prueba', body: 'Cuerpo de prueba', IdUser: BigInt(1), isFavorite: false }),
          },
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    service = module.get<NotesService>(NotesService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear una nota', async () => {
    const createNoteDto: CreateNoteDto = { title: 'Nota de prueba', body: 'Cuerpo de prueba', IdUser: BigInt(1) };
    const result = await controller.createNote(createNoteDto);
    expect(result).toEqual({ id: 1, title: 'Nota de prueba', body: 'Cuerpo de prueba', IdUser: BigInt(1), isFavorite: false });
    expect(service.create).toHaveBeenCalledWith(createNoteDto);
  });

  it('debería encontrar todas las notas', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, title: 'Nota de prueba', body: 'Cuerpo de prueba', IdUser: BigInt(1), isFavorite: false }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('debería encontrar una nota por id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({ id: 1, title: 'Nota de prueba', body: 'Cuerpo de prueba', IdUser: BigInt(1), isFavorite: false });
    expect(service.findOne).toHaveBeenCalledWith(BigInt(1));
  });

  it('debería lanzar un error si la nota no se encuentra', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(null);
    await expect(controller.findOne('2')).rejects.toThrow(NotFoundException);
  });

  it('debería actualizar una nota', async () => {
    const updateNoteDto: UpdateNoteDto = { title: 'Nota de prueba actualizada', body: 'Cuerpo de prueba actualizado', isFavorite: true };
    const result = await controller.update('1', updateNoteDto);
    expect(result).toEqual({ id: 1, title: 'Nota de prueba actualizada', body: 'Cuerpo de prueba actualizado', IdUser: BigInt(1), isFavorite: true });
    expect(service.update).toHaveBeenCalledWith(BigInt(1), updateNoteDto);
  });

  it('debería eliminar una nota', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ id: 1, title: 'Nota de prueba', body: 'Cuerpo de prueba', IdUser: BigInt(1), isFavorite: false });
    expect(service.remove).toHaveBeenCalledWith(BigInt(1));
  });
});
