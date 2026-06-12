import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    create(data: Partial<UserEntity>): Promise<UserEntity>;
    update(id: number, data: Partial<UserEntity>): Promise<UserEntity>;
    delete(id: number): Promise<void>;
}
