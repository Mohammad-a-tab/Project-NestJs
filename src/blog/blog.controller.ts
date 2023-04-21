import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { Blog } from './blog.entity';


@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createBlog(@Body() createBlogDto: CreateBlogDTO, @Req() req): Promise<Blog> {
        
    }

}
