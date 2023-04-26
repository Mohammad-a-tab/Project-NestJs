import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    @ManyToOne(() => User, (user) => user.blogs)
    user: User
}