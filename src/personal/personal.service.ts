import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { SessionCurrent } from 'src/core/session_current';
import { SupabaseRemote } from 'src/core/supabase-remote';
import { CreateExercicieDto } from './dto/create-exercicie.dto';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PersonalService {

  constructor(
    private remote: SupabaseRemote,
    private session: SessionCurrent
  ) { }

  async findAllStudents() {
    let res = await this.remote
      .client.
      from("student")
      .select("profile_id,height, weight, profile!inner(name,gender,city,birth_date,phone)")
      .eq('personal_id', this.session?.user?.id);

    return res.data;
  }

  async findOneStudents(id: string) {
    let res = await this.remote
      .client.
      from("student")
      .select("profile_id,height, weight, profile!inner(name,gender,city,birth_date,phone)")
      .eq('personal_id', this.session?.user?.id)
      .eq('profile_id', id);

    return res.data;
  }

  async createPlan(idStudent: string, createPlanDto: CreatePlanDto) {
    await this.remote.client
      .from('training_plan')
      .insert({
        day_of_week: createPlanDto.dayOfWeek,
        student_id: idStudent,
        personal_id: this.session?.user?.id
      });

    let res = await this.remote.client
      .from('training_plan')
      .select('id')
      .eq('day_of_week', createPlanDto.dayOfWeek)
      .eq('student_id', idStudent)
      .eq('personal_id', this.session?.user?.id).single()


    if (res.data != null) {
      createPlanDto.exercicies.forEach(async (value: CreateExercicieDto) => {
        await this.remote.client.from('exercicies').insert(
          {
            name: value.name,
            series: value.series,
            repetition: value.repetition,
            note: value.note,
            training_plan_id: res.data?.id
          }
        )
      });

      return;

    }

    throw new BadRequestException(res.error?.message)
  }

  updatePlan(
    idStudent: string,
    idTrainingPlan: string,
    updatePlanDto: UpdatePlanDto
  ) {
    return ``;
  }

  removePlan(idStudent: string, idTrainingPlan: string) {
    return ``;
  }
}
