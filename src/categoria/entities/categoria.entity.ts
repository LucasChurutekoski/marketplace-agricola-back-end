import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Anuncio } from "../../anuncio/entities/anuncio.entity.js";
import type { Relation } from "typeorm";

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

    @OneToMany(() => Anuncio, (anuncio) => anuncio.categoria)
    anuncios!: Relation<Anuncio[]>;

}
