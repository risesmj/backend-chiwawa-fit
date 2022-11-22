import { ApiProperty } from "@nestjs/swagger";
import { GenderChoices } from "src/auth/enum/gender-choices";

export class ProfileDto {
    @ApiProperty({
        example: "Matheus José da Cunha"
    })
    name: string;

    @ApiProperty({
        enum: GenderChoices,
        example: [GenderChoices.male, GenderChoices.female, GenderChoices.other]
    })
    gender: GenderChoices;

    @ApiProperty({
        example: "São Paulo"
    })
    city: string;

    @ApiProperty({
        example: "SP"
    })
    state: string;

    @ApiProperty({
        example: "2000-08-20"
    })
    birth_date: string;

    @ApiProperty({
        example: "47992287327"
    })
    phone: string;
}