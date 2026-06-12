import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.usersService.findOne(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  @Post()
  async create(@Body() data: Partial<UserEntity>): Promise<UserEntity> {
    return this.usersService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<UserEntity>): Promise<UserEntity> {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}