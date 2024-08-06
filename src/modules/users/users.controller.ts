import { Controller, Get, Param, Delete, NotFoundException,Body,Post } from '@nestjs/common';
import { UsersService, User } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Obtener a un usuario por su nombre de usuarios' }) // Descripción del endpoint
  @ApiParam({ name: 'username', description: 'nombre de usuario ', type: String }) // Descripción del parámetro de ruta
  @ApiResponse({status:200, description:'Se encontro al usuario'})
  @ApiResponse({status:400, description:'No se encontro al usuario'})
  async findOne(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Borrar a un usuario con su UserID' }) // Descripción del endpoint
  @ApiParam({ name: 'userId', description: 'Id unica del usuairo ', type: Number }) // Descripción del parámetro de ruta
  @ApiResponse({status:200, description:'Se encontro al usuario'})
  @ApiResponse({status:400, description:'No se encontro al usuario'})
  async deleteUser(@Param('userId') userId: number): Promise<void> {
    const user = await this.usersService.findOne(userId.toString());
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersService.deleteUser(userId);
  }
  @Post()
  async postNewUser(@Body() newUser: Omit<User, 'userId'>) {
    return await this.usersService.postNewUser(newUser);

    
  }
}
