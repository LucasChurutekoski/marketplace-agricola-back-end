import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusVendaEnum } from "../enum/StatusVendaEnum.js";
import { Anuncio } from "../../anuncio/entities/anuncio.entity.js";
import type { Relation } from "typeorm";
import { Usuario } from "../../users/entities/user.entity.js";

@Entity('venda')
export class Venda {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    quantidade!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valorUnitario!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valorTotal!: number;

    @Column({ type: 'enum', enum: StatusVendaEnum })
    status!: StatusVendaEnum;

    @CreateDateColumn()
    criadoEm!: Date;

    @UpdateDateColumn()
    atualizadoEm!: Date;

    @ManyToOne(() => Anuncio, (anuncio) => anuncio.vendas)
    anuncio!: Relation<Anuncio>;

    @ManyToOne(() => Usuario, usuario => usuario.vendasComoVendedor)
    @JoinColumn({ name: 'vendedorId' })
    vendedor!: Relation<Usuario>;

    @ManyToOne(() => Usuario, usuario => usuario.vendasComoComprador, {nullable: true})
    @JoinColumn({ name: 'compradorId' })
    comprador!: Relation<Usuario> | null;

}
