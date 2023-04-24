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
        const blog = await this.blogRepository.createBlog(createBlogDto, user);
        const updateUser = await this.userRepository.updateUser(blog);
        console.log(updateUser);
        return blog;
    }
    async getAllBlogs(user: User): Promise<Blog[]> {
        const blogs = await this.blogRepository.find({ where: { user } })
        return blogs
    }
}
