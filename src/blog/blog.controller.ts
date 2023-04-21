import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBlogDTO } from './dto/create-blog.dto';


@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createBlog(@Body() createBlogDto: CreateBlogDTO, @Req() req): Promise<object> {
        const blog = createBlogDto;
        const mmd = req.headers.authorization.split(" ")[1];
        console.log(req.user);
        return blog        
    }

}
