import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitDto } from './create-habit.dto';

export class UpdateHabitDto extends PartialType(CreateHabitDto) {
    userId?: bigint;
    text?: string;
    date?: Date;
}
