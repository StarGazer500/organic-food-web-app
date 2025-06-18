import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 

  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';


@Entity('normalusers')
export class NormalUser {
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


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
