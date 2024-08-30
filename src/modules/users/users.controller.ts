import { Controller, Get, Post, Body, Param, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Obtener un usuario por su nombre de usuario' })
  @ApiParam({ name: 'username', description: 'Nombre de usuario', type: String })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado satisfactoriamente',
    schema: {
      example: {
        id: 1,
        email: 'johndoe@example.com',
        name: 'John Doe',
        ItHasIntegration: true,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('username') username: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Eliminar un usuario por su ID' })
  @ApiParam({ name: 'userId', description: 'ID único del usuario', type: Number })
  @ApiResponse({ status: 200, description: 'Usuario eliminado satisfactoriamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async deleteUser(@Param('userId') userId: number): Promise<void> {
    const user = await this.usersService.findOne(userId.toString());
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersService.deleteUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({
    description: 'Datos del nuevo usuario',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'johndoe' },
        email: { type: 'string', example: 'johndoe@example.com' },
        name: { type: 'string', example: 'John Doe' },
        password: { type: 'string', example: 'securepassword123' },
        ItHasIntegration: { type: 'boolean', example: true },
      },
      required: ['username', 'email', 'name', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado satisfactoriamente',
    schema: {
      example: {
        id: 1,
        email: 'johndoe@example.com',
        name: 'John Doe',
        ItHasIntegration: true,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos del usuario no válidos' })
  async postNewUser(@Body() newUser: any): Promise<any> {
    return await this.usersService.postNewUser(newUser);
  }
}


