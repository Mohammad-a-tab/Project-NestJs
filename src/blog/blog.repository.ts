import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BlogRepository extends Repository<Blog> {
    constructor(private dataSource: DataSource) {
        super(Blog, dataSource.createEntityManager());
    }
    async createBlog(createBlogDto: CreateBlogDTO, user: User): Promise<object> {
        let { title, description, image } = createBlogDto;
        const blog = this.create({title, description, image});
        const userCreated = await this.save(blog).then(user => {
            return {
                statusCode : 201,
                message : 'Success',
                user
            }
        }).catch(error => {
            if(error.code === '23505')throw new BadRequestException('Email already exist please enter another email')
            throw new InternalServerErrorException("we don't Signup you. Wrong some thing please trining again")
        })
        return userCreated;
    }
}