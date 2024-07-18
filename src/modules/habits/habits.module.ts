import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { PrismaModule } from '../../common/utils/prisma.module';

@Module({ // Definición del módulo HabitsModule
  imports: [PrismaModule],  // Importa el módulo PrismaModule para tener acceso a PrismaService
  providers: [HabitsService], // Proveedores del módulo, en este caso el servicio de hábitos
  controllers: [HabitsController], // Controladores del módulo, en este caso el controlador de hábitos
})
export class HabitsModule {}

