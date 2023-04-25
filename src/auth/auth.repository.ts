import { DataSource, Repository } from "typeorm";
import { RegisterUserDTO } from "src/auth/dto/register-user.dto";
import { User } from "src/auth/user.entity";
import * as bcrypt from 'bcrypt'
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Blog } from "src/blog/blog.entity";
import { ObjectId } from "mongodb";
@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
    async createUser(registerUserDto: RegisterUserDTO) : Promise<object>{
        let { name, email, password } = registerUserDto;
        const salt = await bcrypt.genSaltSync()
        password = await bcrypt.hashSync(password, salt)
        const user = this.create({name, email, password});
        const userCreated = await this.save(user).then(user => {
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
    async updateUser(blog: Blog): Promise<object>{
        const copyBlog = JSON.parse(JSON.stringify(blog))
        delete copyBlog.user
        delete copyBlog.created_at
        delete copyBlog.updated_at
        const updateUser = await this.update(blog.user, { blogs: [copyBlog] });
        return updateUser;
    }
    async deleteBlogFromUser(blog: Blog, user: User): Promise<User>{
        const usermmd = await this.findOne({where:{}, re})
        
        console.log(usermmd);
        
        return usermmd;
    }
    
}
