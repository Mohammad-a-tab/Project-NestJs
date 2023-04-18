import { IsEmail, IsString, Length } from "class-validator";
export class LoginUserDTO {
    @IsEmail()
    email: string;
    @Length(6, 20)
    @IsString()
    password: string;
}