import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('attendance')
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  userId: number = 0;

  @Column({ type: 'date' })
  date: string = '';

  @Column()
  timing: string = '';

  @Column()
  status: string = '';

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

  @ManyToOne(() => UserEntity)
  user: UserEntity = new UserEntity();
}