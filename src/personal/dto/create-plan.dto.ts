import { ApiProperty } from "@nestjs/swagger";
import { DayOfWeek } from "src/shared/day-of-week.enum";
import { CreateExercicieDto } from "./create-exercicie.dto";

export class CreatePlanDto {
    @ApiProperty({
        enum: DayOfWeek,
        examples: [
            DayOfWeek.sunday,
            DayOfWeek.monday,
            DayOfWeek.tuesday,
            DayOfWeek.wednesday,
            DayOfWeek.thursday,
            DayOfWeek.friday,
            DayOfWeek.saturday
        ],
        required: true
    })
    dayOfWeek: DayOfWeek

    @ApiProperty({
        type: CreateExercicieDto,
        isArray: true,
        required: true
    })
    exercicies: Array<CreateExercicieDto>
}