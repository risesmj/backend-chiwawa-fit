import { ApiProperty } from "@nestjs/swagger";
import { GenderChoices } from "../enum/gender-choices";

export class SignUpPersonalDto {
    @ApiProperty({
        example: "Julius",
        required: true
    })
    public name: string;

    @ApiProperty({
        example: "julius@gmail.com",
        required: true
    })
    public email: string;

    @ApiProperty({
        example: "*******",
        required: true
    })
    public password: string;

    @ApiProperty({
        example: "Itajaí",
        required: true
    })
    public city: string;

    @ApiProperty({
        example: "SC",
        required: true
    })
    public state: string;

    @ApiProperty({
        example: "47992283876",
        required: true
    })
    public phone: string;

    @ApiProperty({
        example: "13783737773",
        required: true
    })
    public license: string;

}