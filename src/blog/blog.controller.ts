import { Body, Controller, Post, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {}

    @Post()
    async createBlog(@Body() createBlogDto: CreateBlogDTO, @Req() req): Promise<object> {
        const blog = createBlogDto;
        const mmd = req.headers.authorization.split(" ")[1];
        return blog        
    }

}
