import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
export class RegisterUserDTO {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    email: string;
    
    @IsString()
    @Length(6, 20)
    password: string;
}