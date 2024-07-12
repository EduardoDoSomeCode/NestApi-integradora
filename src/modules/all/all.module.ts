// Importa el decorador Module desde el paquete @nestjs/common
import { Module } from '@nestjs/common';

// Importa el servicio AllService desde el archivo all.service.ts
import { AllService } from './all.service';

// Importa el controlador AllController desde el archivo all.controller.ts
import { AllController } from './all.controller';

// Importa el módulo PrismaModule desde una ruta relativa en common/prisma.module.ts
import { PrismaModule } from '../../common/prisma.module';

// Define un módulo en NestJS
@Module({
  // Aquí se importa PrismaModule,
  // que probablemente proporciona la funcionalidad del cliente de Prisma para operaciones de base de datos.
  imports: [PrismaModule],
  providers: [AllService],

  // Especifica los controladores para este módulo.
  controllers: [AllController],
})
// Exporta la clase AllModule
export class AllModule {}
