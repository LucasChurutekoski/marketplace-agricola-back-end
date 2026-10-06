import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../../users/entities/user.entity.js";
import type { Relation } from "typeorm";

@Entity('endereco')
export class Endereco {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    

    @Column({ nullable: true, length: 9 })
    cep!: string;

    @Column({ length: 120 })
    cidade!: string;

    @Column({length: 2, nullable: true})
    uf!: string;

    @Column({ length: 120 })
    bairro!: string;

    @Column({ length: 60 })
    rua!: string;

    @Column({ length: 8 })
    numero!: string;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    latitude!: number;

    @Column({ type: 'decimal', scale: 7, precision: 10 })
    longitude!: number;

    @Column({ type: 'boolean' })
    ativo!: boolean;

    @CreateDateColumn()
    criadoEm!: Date;

    @UpdateDateColumn()
    atualizadoEm!: Date;


    @ManyToOne(() => Usuario, (usuario) => usuario.enderecos)
    @JoinColumn({ name: 'usuarioId' })
    usuario!: Relation<Usuario>;
}
