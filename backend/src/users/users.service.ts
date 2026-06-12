import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {}

  async findAll(): Promise<UserEntity[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const entity = this.repo.create({ name: data.name, email: data.email });
    return this.repo.save(entity);
  }

  async update(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
    const entity = await this.repo.preload({ id, ...data });
    if (!entity) throw new Error('User not found');
    return this.repo.save(entity);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}