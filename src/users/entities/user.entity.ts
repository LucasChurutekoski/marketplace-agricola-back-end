import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { tipoUsuarioEnum } from "../enum/userRole.enum.js";
import { Anuncio } from "../../anuncio/entities/anuncio.entity.js";
import type { Relation } from "typeorm";
import { Endereco } from "../../endereco/entities/endereco.entity.js";
import { Venda } from "../../venda/entities/venda.entity.js";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ length: 120 })
    nome!: string;

    @Column({ unique: true, length: 255 })
    email!: string;

    @Column({ length: 20, nullable: true })
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
    ativo!: boolean;

    @CreateDateColumn()
    criadoEm!: Date;

    @UpdateDateColumn()
    atualizadoEm!: Date;

    @OneToMany(() => Anuncio, (anuncio) => anuncio.usuario)
    anuncios!: Relation<Anuncio[]>;

    @OneToMany(() => Endereco, (endereco) => endereco.usuario)
    enderecos!: Relation<Endereco[]>;

    @OneToMany(() => Venda, venda => venda.vendedor)
    vendasComoVendedor!: Relation<Venda[]>;

    @OneToMany(() => Venda, venda => venda.comprador)
    vendasComoComprador!: Relation<Venda[]>;
}
