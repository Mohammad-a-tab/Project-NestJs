import { Injectable, NotFoundException } from "@nestjs/common";
import { Blog } from "./blog.entity";
import { BlogRepository } from "./blog.repository";
import { InjectRepository } from "@nestjs/typeorm"
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { UpdateBlogDTO } from "./dto/update-blog.dto";
import { User } from "src/auth/user.entity";
@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogRepository) private readonly blogRepository: BlogRepository
        ) { }
    public async getAllBlogs(): Promise<Blog[]> {
        const blogs = await this.blogRepository.find()
        return blogs
    }
    public async getBlogById(id: string, user: User): Promise<Blog> {
        const blog = await this.blogRepository.findOne({ where: { id } });
        if (!blog) throw new NotFoundException(`Not Found Blog with id : ${id}`)
        return blog;
    }
    public async createBlog(createBlogDto: CreateBlogDTO, user: User): Promise<Blog> {
        const blog = this.blogRepository.createBlog(createBlogDto, user);
        return blog
    }
    public async deleteBlogById(id: string, user: User): Promise<Blog> {
        const blog = await this.getBlogById(id, user);
        await this.blogRepository.remove(blog);
        return blog;
    }
    public async updateBlog(id: string, updateBlogDto: UpdateBlogDTO, user: User): Promise<Blog> {
        return this.blogRepository.updateBlog(id, updateBlogDto, user);
    }
}