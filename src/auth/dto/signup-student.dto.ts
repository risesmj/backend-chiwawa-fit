import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GenderChoices } from "../enum/gender-choices";
import { SignUpProfile } from "./signup-profile";

export class SignUpStudentDto implements SignUpProfile {
    @ApiProperty({
        example: "Thompson",
        required: true
    })
    public name: string;

    @ApiProperty({
        enum: GenderChoices,
        example: [GenderChoices.male, GenderChoices.female, GenderChoices.other],
        required: true
    })
    public gender: GenderChoices;

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
        example: "47992283871",
        required: true
    })
    public phone: string;


    public birth_date: string;

    @ApiProperty({
        example: "1998-08-14",
        required: true
    })
    public height: number;

    @ApiProperty({
        example: 160,
        required: true,
        description: "Altura em centímetros (cm)"
    })
    public weight: number;

    @ApiProperty({
        required: true
    })
    public goal_id: string;
}
