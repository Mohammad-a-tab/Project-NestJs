import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/login-user.dto";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { AccessToken } from "./token.interface";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }
    @Post('signup')
    signup(@Body() registerUserDto: RegisterUserDTO): Promise<object> {
        return this.authService.signup(registerUserDto);
    }
    @Post('signin')
    signin(@Body() loginUserDto: LoginUserDTO): Promise<AccessToken> {
        return this.authService.signin(loginUserDto)
    }
}
