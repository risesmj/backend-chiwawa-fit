import { ApiProperty } from "@nestjs/swagger";

export class CreateExercicieDto {
    @ApiProperty({
        example: "Cruxifixo Deitado",
        required: true
    })
    name: string;

    @ApiProperty({
        example: 3,
        required: true
    })
    series: number;

    @ApiProperty({
        example: 12,
        required: true
    })
    repetition: number;

    @ApiProperty({
        example: "Utilize uma carga de peso de pelo menos 15kg",
        required: false
    })
    note: string


    public toMap(trainingPlanId: string) {
        return {
            name: this.name,
            series: this.series,
            repetition: this.repetition,
            note: this.note,
            training_plan_id: trainingPlanId
        }
    }
}