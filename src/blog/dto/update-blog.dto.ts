import { IsString, IsNotEmpty, IsOptional } from "class-validator";
export class UpdateBlogDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    title?: string
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    description?: string
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    image?: string
}