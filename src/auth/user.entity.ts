import { Column, CreateDateColumn, Entity, OneToMany, ObjectId, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @ObjectIdColumn()
    id: ObjectId;
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: false, unique: true })
    email: string;
    @Column({ nullable: false })
    password: string
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date
    @Column({ default: "" })
    token: string;
}