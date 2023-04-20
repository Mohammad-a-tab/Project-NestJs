import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BlogRepository extends Repository<Blog> {
    constructor(private dataSource: DataSource) {
        super(Blog, dataSource.createEntityManager());
    }
    async createBlog(createBlogDto: CreateBlogDTO, user: User): Promise<CreateBlogDTO> {
        console.log(user);
        return createBlogDto
    }
}