import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { UserRepository } from "src/repositories/auth.repository";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        // private readonly jwtService: JwtService
    ) { }
    async signup(registerUserDto: RegisterUserDTO): Promise<object> {
        let { name, email, password } = registerUserDto;
        const salt = bcrypt.genSaltSync()
        password = bcrypt.hashSync(password, salt)
        const user = this.userRepository.create({name, email, password});
        const userCreated = await this.userRepository.save(user)
        console.log(userCreated);
        return userCreated;
    }
    // async signin(loginUserDto: LoginUserDTO): Promise<AccessToken> {
    //     let { email, password } = loginUserDto;
    //     const user = await this.userRepository.findOne({ email });
    //     const payload: Payload = { email: user.email }
    //     if (user && bcrypt.compareSync(password, user.password)) {
    //         let accessToken = await this.jwtService.sign(payload)
    //         user.token = accessToken
    //         const response = await this.userRepository.save(user).then(user => {
    //             return {accessToken : user.token}
    //         }).catch(error => {
    //             throw new UnauthorizedException("we don't signup you. please trining again")
    //         })
    //         return response
    //     } else {
    //         throw new UnauthorizedException('Email or password is not true, please trining  again')
    //     }
    // }
}