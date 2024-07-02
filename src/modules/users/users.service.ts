import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private  users = [
    {
      userId: 1,
      username: 'john',
      email: 'johonFK196@gmail.com',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      email: 'marr491_@gmail.com',
      password: 'guess',
    },
    {
      userId: 3,
      username: 'Gururior',
      email: 'gurur9991@gmail.com',
      password: 'AmerikaYa19',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async deleteUser(userId: number): Promise<void> {
    const index = this.users.findIndex((user) => user.userId === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  async postNewUser(newUser: Omit<User, 'userId'>): Promise<User> {
    const newUserId = this.users.length > 0 ? Math.max(...this.users.map(u => u.userId)) + 1 : 1;
    const user: User = { userId: newUserId, ...newUser };
    this.users.push(user);
    return user;
  }
}
