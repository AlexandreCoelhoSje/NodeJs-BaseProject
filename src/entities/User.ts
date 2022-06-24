import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    readonly id?: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    constructor(name, email, admin, password) {

        if (!this.id)
            this.id = uuid();

        this.name = name;
        this.email = email;
        this.admin = admin;
        this.password = password;
    }
}
