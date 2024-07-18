import { Controller, Get, Param, Delete, NotFoundException,Body,Post } from '@nestjs/common';
import { UsersService, User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':userId')
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
