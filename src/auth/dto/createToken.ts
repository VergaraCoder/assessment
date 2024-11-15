import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreationTokenDTO{
    @ApiProperty({
        example:"jhonatan@gmail.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty({
        example:"jhonatan123/"
    })
    @IsNotEmpty()
    @IsString()
    password:string;
}