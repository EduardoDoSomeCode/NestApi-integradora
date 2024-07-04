import { Injectable } from '@nestjs/common';
import { CreateAllDto } from './dto/create-all.dto';
import { UpdateAllDto } from './dto/update-all.dto';
import { NotFoundException } from '@nestjs/common';

export type AllTodo = any
@Injectable()
export class AllService {

  private Alltodos:AllTodo = [
    {
      id:1,
      userId: 1,
      title: 'Clean the dishes',
    },
    {
      id:2,
      userId: 2,
      title: 'Programming a bit',
    },
  ]
  create(createAllDto: CreateAllDto): AllTodo {
    const newTodo: AllTodo = {
      id: this.Alltodos.length + 1,
      ...createAllDto,
    };
    this.Alltodos.push(newTodo);
    return newTodo;
  }
  findAll(): AllTodo[] {
    return this.Alltodos;
  }

  findOne(id: number): AllTodo {
    const todo = this.Alltodos.find(todo => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Su tarea no existe con:  ${id} `);
    }
    return todo;
  }

  update(id: number, updateAllDto: UpdateAllDto): AllTodo {
    const todoIndex = this.Alltodos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException(`Su tarea no existe con:  ${id} `);
    }
    const updatedTodo = { ...this.Alltodos[todoIndex], ...updateAllDto };
    this.Alltodos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  remove(id: number): void {
    const todoIndex = this.Alltodos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException(`Su tarea no existe con:  ${id} `);
    }
    this.Alltodos.splice(todoIndex, 1);
  }
}
 
