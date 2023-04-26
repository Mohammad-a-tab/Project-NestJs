import { Blog } from "src/blog/blog.entity";
import { Column, CreateDateColumn, Entity, OneToMany, ObjectId, ObjectIdColumn } from "typeorm";

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
    @Column({ default: "" })
    token: string;
    @OneToMany(() => Blog, (blog) => blog.user)
    blogs: Blog[]
}