import { Test, TestingModule } from '@nestjs/testing';
import { AllService } from './all.service';

// Define un bloque de pruebas para el servicio AllService.
describe('AllService', () => {
  // Declara una variable para almacenar la instancia del servicio.
  let service: AllService;

  beforeEach(async () => {
    // Aquí se define el módulo de prueba y se especifica que AllService
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllService],
    }).compile(); // Compila el módulo de prueba para que esté listo para usar.

    // Obtiene la instancia del servicio AllService desde el módulo de prueba.
    service = module.get<AllService>(AllService);
  });
  it('should be defined', () => {
    // Verifica que el servicio no sea null ni undefined.
    expect(service).toBeDefined();
  });
});
