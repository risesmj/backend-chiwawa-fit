import { ApiProperty } from "@nestjs/swagger";
import { ProfileDto } from "./profile.dto";

export class UpdateProfileDto {
    @ApiProperty({
        example: "160"
    })
    height: number | null;

    @ApiProperty({
        example: "60.2"
    })
    weight: number | null;

    @ApiProperty({
        example: "876678888"
    })
    license: number | null;

    @ApiProperty({
        type: ProfileDto,
        isArray: false
    })
    profile: ProfileDto | null;

}
