import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { User } from '../models/user.model';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<UserEntity>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    create(data: Partial<User>): Promise<User>;
    update(id: number, data: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}
