import { ApiProperty } from "@nestjs/swagger";

export class SignUpStudentDto {
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
        example: "Thompson",
        required: true
    })
    public name: string;
}
