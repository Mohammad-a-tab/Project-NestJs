import { IsString, IsNotEmpty } from "class-validator";

export class CreateBlogDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    image: string;


}