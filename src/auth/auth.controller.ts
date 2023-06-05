import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/login-user.dto";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { AccessToken } from "./token.interface";
import { ApiTags, ApiBody, ApiConsumes } from "@nestjs/swagger";
// import { User } from "./user.entity";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }
    @Post('signup')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiBody({
        description: 'Register user',
        schema: {
            type: 'object',
            properties: {
                name : { type: 'string' },
                email : { type: 'string' },
                password : { type: 'string' }
            },
            required: ['name', 'email', 'password'],
        },
    })
    signup(@Body() registerUserDto: RegisterUserDTO): Promise<object> {
        return this.authService.signup(registerUserDto);
    }
    @Post('signIn')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiBody({
        description: 'Login user',
        schema: {
            type: 'object',
            properties: {
                email : { type: 'string' },
                password : { type: 'string' }
            },
            required: ['email', 'password'],
        },
    })
    signIn(@Body() loginUserDto: LoginUserDTO): Promise<AccessToken> {
        return this.authService.signIn(loginUserDto)
    }
    // @Get()
    // getall(): Promise<User[]> {
    //     return this.authService.getAll();
    // }
}
