import { IsNotEmpty, IsUUID } from "class-validator"

export class BlogIdDTO{
    @IsUUID(4)
    @IsNotEmpty()
    id : string
}