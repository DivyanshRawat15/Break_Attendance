import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity | null>;
    create(data: Partial<UserEntity>): Promise<UserEntity>;
    update(id: number, data: Partial<UserEntity>): Promise<UserEntity>;
    delete(id: number): Promise<void>;
}
