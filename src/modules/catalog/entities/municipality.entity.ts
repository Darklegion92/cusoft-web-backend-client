import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('municipalities')
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'department_id' })
  departmentId: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  codefacturador: number;
}