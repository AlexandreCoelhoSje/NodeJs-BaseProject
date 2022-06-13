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

    constructor() {

        if (!this.id) {
            this.id = uuid();
        }
    }

}
