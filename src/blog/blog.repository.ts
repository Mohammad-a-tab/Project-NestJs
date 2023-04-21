import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { User } from 'src/auth/user.entity';
import { UserRepository } from "src/auth/auth.repository";

@Injectable()
export class BlogRepository extends Repository<Blog> {
    constructor(
            private dataSource: DataSource,
            private readonly userRepository: UserRepository
        ) {
        super(Blog, dataSource.createEntityManager());
    }
    async createBlog(createBlogDto: CreateBlogDTO, user: User): Promise<Blog> {
        const userSave = await this.userRepository.findOneBy({name:  user.name})
        if(!userSave) 
            throw new InternalServerErrorException("Operation failed")
        const { title, description, image } = createBlogDto;
        const 
    }
}