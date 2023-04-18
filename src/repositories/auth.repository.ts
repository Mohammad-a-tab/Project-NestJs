import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { RegisterUserDTO } from "src/auth/dto/register-user.dto";
import { EntityRepository, Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import * as bcrypt from 'bcrypt'
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(registerUserDto: RegisterUserDTO) : Promise<object>{
        let { name, email, password } = registerUserDto;
        const salt = await bcrypt.genSaltSync()
        password = bcrypt.hashSync(password, salt)
        const user = await this.create({name, email, password});
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
}