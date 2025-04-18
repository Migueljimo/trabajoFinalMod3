/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  
  export enum UserRoleEnum {
    ADMIN = 'ADMIN',
    USER = 'USER',
  }
  
  @Entity('users')
  @Unique(['login', 'email'])
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 30 })
    login: string;
  
    @Column({ length: 300, select: false })
    password: string;
  
    @Column({ length: 150 })
    fullname: string;
  
    @Column({ length: 150 })
    email: string;
  
    @Column({ length: 30, nullable: true })
    phone: string;
  
    @Column({ type: 'timestamp without time zone', nullable: true })
    last_access: Date | null;
  
    @Column({ default: false })
    enabled: boolean;
  
    @Column({ type: "enum", enum: UserRoleEnum, default: UserRoleEnum.USER })
    role: UserRoleEnum;
  
    @CreateDateColumn({ type: 'timestamp without time zone', select: false })
    created_at: Date;
  
    @UpdateDateColumn({
      type: 'timestamp without time zone',
      select: false,
      nullable: true,
    })
    updated_at: Date;
  }
  