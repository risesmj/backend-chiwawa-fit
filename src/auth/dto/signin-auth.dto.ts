import { ApiProperty } from "@nestjs/swagger/dist"
import { IsNotEmpty, IsString } from "class-validator"

export class SignInAuthDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    login: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
}
