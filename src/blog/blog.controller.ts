import { Body, Controller, Post, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDTO } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {}

    @Post()
    async createBlog(@Body() createBlogDto: CreateBlogDTO, @Req() req): Promise<object> {
        const blog = createBlogDto;
        console.log(req.user);
        return blog        
    }

}
