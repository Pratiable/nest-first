import { IsNumber, IsString } from "class-validator";

export class updateMovieDto{
    @IsString()
    title?: string
    @IsNumber()
    year?: number
    @IsString({each:true})
    genres?: string[]

}