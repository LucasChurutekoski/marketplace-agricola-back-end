import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categoria')
export class Categoria {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ length: 120 })
    nome!: string;

    @Column({ length: 400 })
    descricao!: string;

    @Column()
    ativo!: boolean

    @CreateDateColumn({ type: 'timestamptz' })
    criadoEm!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    atualizadoEm!: Date;

}
