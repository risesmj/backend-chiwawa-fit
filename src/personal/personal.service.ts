import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { SessionCurrent } from 'src/core/session_current';
import { SupabaseRemote } from 'src/core/supabase-remote';
import { CreateExercicieDto } from './dto/create-exercicie.dto';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { RequestStatus } from './enum/request-status.enum';

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
      .select("profile_id,height, weight, profile!inner(name,gender,city,state,birth_date,phone)")
      .eq('personal_id', this.session?.user?.id);

    return res.data;
  }

  async findOneStudents(id: string) {
    let res = await this.remote
      .client.
      from("student")
      .select("profile_id,height, weight, profile!inner(name,gender,city,state,birth_date,phone)")
      .eq('personal_id', this.session?.user?.id)
      .eq('profile_id', id);

    return res.data;
  }

  async findRequests() {
    let res = await this.remote
      .client.
      from("request")
      .select("id, created_at, status, student!inner(height, weight,profile!inner(name,gender,city,state,birth_date,phone))")
      .eq('personal_id', this.session?.user?.id)
      .eq('status', RequestStatus.pending);

    if (res.error?.message?.length > 0) {
      throw new BadRequestException(res.error.message);
    }

    return res.data;
  }

  async acceptOrRejectRequest(id: string, status: string) {

    if (status != RequestStatus.accepted && status != RequestStatus.rejected) {
      throw new BadRequestException("O status deve ser accepted ou rejected");
    }

    let requestCurrent = await this.remote.client
      .from('request')
      .select()
      .eq('id', id)
      .neq('status', 'pending')
      .single()

    if (requestCurrent.data != null) {
      throw new BadRequestException("Esta solicitação já foi respondida.");
    }

    //if accepted, update current personal on entity student
    if (status == RequestStatus.accepted) {
      let resStudent = await this.remote
        .client.
        from("request")
        .select("student_id")
        .eq('id', id)
        .single();

      if (resStudent.data != null) {
        await this.remote.client
          .from('student')
          .update({
            personal_id: this.session?.user?.id
          })
          .eq('profile_id', resStudent.data.student_id);
      }

      if (resStudent.error?.message?.length > 0) {
        throw new BadRequestException(resStudent.error.message);
      }
    }

    //update status on entity request
    let res = await this.remote
      .client.
      from("request")
      .update({
        status: status
      })
      .eq('id', id);

    if (res.error?.message?.length > 0) {
      throw new BadRequestException(res.error.message);
    }

    return;
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
}
