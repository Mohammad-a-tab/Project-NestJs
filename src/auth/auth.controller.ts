import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/login-user.dto";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { AccessToken } from "./token.interface";
import { ApiTags } from "@nestjs/swagger";
// import { User } from "./user.entity";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }
    @Post('signup')
    signup(@Body() registerUserDto: RegisterUserDTO): Promise<object> {
        return this.authService.signup(registerUserDto);
    }
    @Post('signIn')
    signIn(@Body() loginUserDto: LoginUserDTO): Promise<AccessToken> {
        return this.authService.signIn(loginUserDto)
    }
    // @Get()
    // getall(): Promise<User[]> {
    //     return this.authService.getAll();
    // }
}
