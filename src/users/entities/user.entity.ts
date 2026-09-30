import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tipoUsuarioEnum } from "../enum/userRole.enum.js";

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
        enum: tipoUsuarioEnum,
        default: tipoUsuarioEnum.COMPRADOR,
    })
    tipoUsuario: tipoUsuarioEnum;

    @Column({ default: true })
    ativo: boolean;

    @CreateDateColumn()
    criadoEm: Date;

    @UpdateDateColumn()
    atualizadoEm: Date;
}
