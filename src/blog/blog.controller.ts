import { Body, Controller, Param, Get, Post, Req, Delete, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiSecurity, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { Blog } from './blog.entity';
import { BlogIdDTO } from './dto/id-blog.dto';
import { UpdateBlogDTO } from './dto/update-blog.dto';

@ApiTags('blogs')
@ApiBearerAuth()
@Controller('blogs')
@UseGuards(AuthGuard())
@ApiSecurity('bearerAuth')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {}
    
    @Post('add')
    @UseGuards(AuthGuard('jwt'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'create blog document',
        schema: {
            type: 'object',
            properties: {
                title : { type: 'string' },
                description : { type: 'string' },
                image : { type: 'file' }
            },
            required: ['name', 'email', 'password'],
        },
    })
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
    @ApiParam({
        name: 'id',
        description: 'Blog ID',
        type: 'string',
        format: 'uuid',
    })
    public getBlogById(@Param() blogIdDto: BlogIdDTO): Promise<Blog> {
        const { id } = blogIdDto
        return this.blogService.getBlogById(id);
    }
    @Delete('remove/:id')
    @ApiParam({
        name: 'id',
        description: 'Blog ID',
        type: 'string',
        format: 'uuid',
    })
    public deleteBlogById(@Param() blogIdDto: BlogIdDTO): Promise<object> {
        const { id } = blogIdDto;
        return this.blogService.deleteBlogById(id);
    }
    @Patch('edit/:id')
    @ApiConsumes('multipart/form-data')
    @ApiParam({
        name: 'id',
        description: 'Blog ID',
        type: 'string',
        format: 'uuid',
    })
    @ApiBody({
        description: 'Update blog document By ID',
        schema: {
            type: 'object',
            properties: {
                title : { type: 'string' },
                description : { type: 'string' },
                image : { type: 'file' }
            },
        },
    })
    public updateBlogById(@Param() blogId: BlogIdDTO, @Body() updateBlogDto: UpdateBlogDTO, @Req() req): Promise<object> {
        const user = req.user;
        const { id } = blogId;
        return this.blogService.updateBlog(id, updateBlogDto, user);
    }
}
