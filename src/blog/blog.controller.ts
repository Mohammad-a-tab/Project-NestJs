import { Body, Controller, Param, Get, Post, Req, Delete, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { Blog } from './blog.entity';
import { BlogIdDTO } from './dto/id-blog.dto';


@Controller('blog')
@UseGuards(AuthGuard())
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {}
    
    @Post()
    @UseGuards(AuthGuard('jwt'))
    public createBlog(@Body() createBlogDto: CreateBlogDTO, @Req() req): Promise<Blog> {
        const user = req.user;
        return this.blogService.createBlog(createBlogDto, user);
    }
    @Get()
    public getAllBlogs(@Req() req): Promise<Blog[]> {
        const user = req.user;
        const blogs = this.blogService.getAllBlogs(user);
        return blogs
    }
    @Get(":id")
    public getBlogById(@Param() blogIdDto: BlogIdDTO, @Req() req): Promise<Blog> {
        const user = req.user;
        const { id } = blogIdDto
        return this.blogService.getBlogById(id, user);
    }
    @Delete(":id")
    public deleteBlogById(@Param() blogIdDto: BlogIdDTO, @Req() req): Promise<object> {
        const user = req.user;
        const { id } = blogIdDto;
        return this.blogService.deleteBlogById(id, user);
    }
}
