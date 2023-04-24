import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { User } from 'src/auth/user.entity';
import { Blog } from './blog.entity';
import { UserRepository } from 'src/auth/auth.repository';
@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogRepository) private readonly blogRepository: BlogRepository,     
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,     
    ) {}
    async createBlog(createBlogDto: CreateBlogDTO, user: User): Promise<Blog>{
        const blog = this.blogRepository.createBlog(createBlogDto, user);
        const updateUser = this.userRepository.save(blog[0]);
        console.log(updateUser);
        return blog;
    }
}
