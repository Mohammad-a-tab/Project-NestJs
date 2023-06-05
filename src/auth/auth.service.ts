import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterUserDTO } from "./dtos/register-user.dto";
import { UserRepository } from "src/auth/auth.repository";
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from "./dtos/login-user.dto";
import { AccessToken } from "./token.interface";
import { Payload } from "./auth.payload";
import { JwtService } from "@nestjs/jwt";
import { User } from './user.entity';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }
    async signup(registerUserDto: RegisterUserDTO): Promise<object> {
        const result = await this.userRepository.createUser(registerUserDto);
        return result;
    }
    async signIn(loginUserDto: LoginUserDTO): Promise<AccessToken> {
        let { email, password } = loginUserDto;
        const user = await this.userRepository.findOneBy({ email });
        const payload: Payload = { email: user.email }
        if (user && bcrypt.compareSync(password, user.password)) {
            let accessToken = this.jwtService.sign(payload)
            user.token = accessToken
            const response = await this.userRepository.save(user).then(user => {
                return {accessToken : user.token}
            }).catch(error => {
                throw new UnauthorizedException("we don't signup you. please trining again")
            })
            return response
        } else {
            throw new UnauthorizedException('Email or password is not true, please trining  again')
        }
    }
    async getAll(): Promise<User[]> {
        return await this.userRepository.find({});
    }
}