import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToMany, 
  JoinTable, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { Role } from './role.entity';

@Entity('adminusers')
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @ManyToMany(() => Role, role => role.users, { eager: true })
  @JoinTable({
    name: 'user_roles', // junction table name
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper method to check if user has a specific role
  hasRole(roleName: string): boolean {
    return this.roles?.some(role => role.name === roleName) || false;
  }

  // Helper method to get role names
  getRoleNames(): string[] {
    return this.roles?.map(role => role.name) || [];
  }
}
