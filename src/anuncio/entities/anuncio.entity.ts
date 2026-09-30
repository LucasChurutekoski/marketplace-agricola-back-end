import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UnidadeMedidaEnum } from "../enums/UnidadeMedidaEnum.js";
import { StatusAnuncioEnum } from "../enums/StatusAnuncioEnum.js";
import { Usuario } from "../../users/entities/user.entity.js";
import type { Relation } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity.js";

@Entity('anuncio')
export class Anuncio {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ length: 150 })
    titulo!: string;

    @Column({ length: 400 })
    descricao!: string;

    @Column({ type: 'smallint' })
    quantidade!: number;

    @Column({ type: 'smallint' })
    quantidadeDisponivel!: number;

    @Column({ type: 'enum', enum: UnidadeMedidaEnum })
    unidadeMedida!: UnidadeMedidaEnum;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valorUnitario!: number;

    @Column({ type: 'enum', enum: StatusAnuncioEnum })
    status!: StatusAnuncioEnum

    @CreateDateColumn()
    criadoEm!: Date;

    @UpdateDateColumn()
    atualizadoEm!: Date;

    @Column()
    imagens!: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.anuncios)
    @JoinColumn({ name: 'usuarioId' })
    usuario!: Relation<Usuario>;

    @ManyToOne(() => Categoria, (categoria) => categoria.anuncios)
    @JoinColumn({name: 'categoriaId'})
    categoria!: Relation<Categoria>


}
