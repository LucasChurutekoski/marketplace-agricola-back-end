import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { userRole } from "../enum/userRole.enum.js";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({length: 120})
    nome!: string;

    @Column({unique: true, length: 255})
    email!: string;

    @Column({length: 20, nullable:true})
    telefone!: string;

    @Column()
    senha!: string;

    @Column({
        type: 'enum',
        enum: userRole,
        default: userRole.COMPRADOR,
    })
    role: userRole;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
