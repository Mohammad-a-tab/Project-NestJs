import { IsMongoId, IsNotEmpty } from "class-validator"

export class BlogIdDTO{
    @IsMongoId()
    @IsNotEmpty()
    id : string;
}