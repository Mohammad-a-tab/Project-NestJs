import { Body, Controller, Param, Get, Post, Req, Delete, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { Blog } from './blog.entity';
import { BlogIdDTO } from './dto/id-blog.dto';
import { UpdateBlogDTO } from './dto/update-blog.dto';

@ApiTags('blogs')
@Controller('blogs')
@UseGuards(AuthGuard())
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {}
    
    @Post('add')
    @UseGuards(AuthGuard('jwt'))
    public createBlog(@Body() createBlogDto: CreateBlogDTO, @Req() req): Promise<Blog> {
        const user = req.user;
        return this.blogService.createBlog(createBlogDto, user);
    }
    @Get('get-all')
    @ApiResponse({ status: 200, description: 'List of blogs' })
    public getAllBlogs(): Promise<Blog[]> {
        const blogs = this.blogService.getAllBlogs();
        return blogs
    }
    @Get('getOne/:id')
    public getBlogById(@Param() blogIdDto: BlogIdDTO): Promise<Blog> {
        const { id } = blogIdDto
        return this.blogService.getBlogById(id);
    }
    @Delete('remove/:id')
    public deleteBlogById(@Param() blogIdDto: BlogIdDTO): Promise<object> {
        const { id } = blogIdDto;
        return this.blogService.deleteBlogById(id);
    }
    @Patch('edit/:id')
    public updateBlogById(@Param() blogId: BlogIdDTO, @Body() updateBlogDto: UpdateBlogDTO, @Req() req): Promise<object> {
        const user = req.user;
        const { id } = blogId;
        return this.blogService.updateBlog(id, updateBlogDto, user);
    }
}
