import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt"
import { Payload } from "./auth.payload";
import { UserRepository } from "./auth.repository";
import { User } from "./user.entity";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'apiChallengeWebLog2021++',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    async validate(payload: Payload): Promise<User> {
        let { email } = payload;
        const user = await this.userRepository.findOneBy({ email })
        if (!user) throw new UnauthorizedException("we don't Signing you in your account please trining again")
        return user
    }
}