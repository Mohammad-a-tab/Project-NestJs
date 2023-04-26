import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm"

@Entity({ name: "blog" })
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: true })
    image: string;
    @Column({ nullable: false })
    title: string;
    @Column({ nullable: false })
    description: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date
    @ManyToOne(_type     => User, user => user.blogs, {eager : false})
    @Exclude({toPlainOnly : true})
    user: User
}