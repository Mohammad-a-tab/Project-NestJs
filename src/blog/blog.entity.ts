import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, ObjectIdColumn, OneToMany, UpdateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'blog' })
export class Blog {
    @ObjectIdColumn()
    id: string;
    @Column({ nullable: false })
    title: string;
    @Column({ nullable: false })
    description: string;
    @Column({ nullable: true })
    image: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date
    @OneToMany(_type => User, user => user.blog, {eager: false})
    @Exclude()
}