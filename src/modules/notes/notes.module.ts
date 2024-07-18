//Importamos el decorador Module desde '@nestjs/common', el servicio de la entidad, el controlador de la entidad y el módulo de Prisma (u otro módulo necesario)
import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaModule } from 'src/common/utils/prisma.module';

// Definimos el módulo para la entidad
@Module({
  // Importamos otros módulos que este módulo necesita
  imports: [PrismaModule],
  // Declaramos los controladores del módulo
  controllers: [NotesController],
  // Declaramos los proveedores del módulo (los servicios)
  providers: [NotesService],
})
export class NotesModule {}
