import { ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { User } from 'src/auth/user.entity';
import { UpdateBlogDTO } from "./dto/update-blog.dto";

@Injectable()
export class BlogRepository extends Repository<Blog> {
    constructor(private dataSource: DataSource) {
        super(Blog, dataSource.createEntityManager());
    }
    async createBlog(createBlogDto: CreateBlogDTO, user: User): Promise<Blog> {
        let userBlogCount = await (await this.find({ where: { user } })).length
        if (userBlogCount < 10) {
            let { title, description, image } = createBlogDto;
            const blog = this.create({ title, description, image, user });
            let response = await this.save(blog).then(user => {
                return user
            }).catch(error => {
                throw new InternalServerErrorException()
            })
            return response
        } else {
            throw new ForbiddenException("Each user can not save more than 10 blogs")
        }
    }
    async updateBlog(id: string, updateBlogDto: UpdateBlogDTO, user: User): Promise<Blog> {
        if (updateBlogDto['user']) {
            delete updateBlogDto['user']
        }
        await this.update({ id }, { ...updateBlogDto })
        return this.findOneBy({id})
    }
}