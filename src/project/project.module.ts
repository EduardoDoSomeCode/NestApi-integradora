import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
@Module({
    controllers:[ProjectController],
    exports:[ProjectService],
})
export class ProjectModule {}
