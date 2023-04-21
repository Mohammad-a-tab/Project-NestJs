import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { User } from 'src/auth/user.entity';
@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogRepository) private readonly blogRepository: BlogRepository,        
    ) {}
    async createBlog(createBlogDto: CreateBlogDTO, user: User): Promise<object>{
        const mmd = await this.blogRepository.createBlog(createBlogDto, user);
        return mmd
    }
}
