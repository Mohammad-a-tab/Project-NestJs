import { DataSource,EntityRepository, Repository } from "typeorm";
import { RegisterUserDTO } from "src/auth/dto/register-user.dto";
import { User } from "src/entities/user.entity";
import * as bcrypt from 'bcrypt'
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
}