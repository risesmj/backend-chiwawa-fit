import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import { SessionCurrent } from 'src/core/session_current';
import { SupabaseRemote } from 'src/core/supabase-remote';

@Injectable()
export class StudentService {

  constructor(
    private supabaseRemote: SupabaseRemote,
    private session: SessionCurrent
  ) { }

  async fetchNewPersonal() {
    let res = await this.supabaseRemote.client
      .from('personal')
      .select('profile_id,profile!inner(name,gender,city,state,birth_date,phone)')

    if (res.error?.message?.length > 0) {
      throw new BadRequestException(res.error?.message);
    }

    if (res.data?.length > 0) {
      let index = res.data?.length == 1 ? 0 : Math.floor(Math.random() * (res.data.length));
      return res.data[index];
    }

    return
  }

  async rquestNewPersonal(personalId: string) {
    let res = await this.supabaseRemote.client
      .from('request')
      .insert({
        student_id: this.session?.user?.id,
        personal_id: personalId
      })

    if (res.error?.message?.length > 0) {
      throw new BadRequestException(res.error?.message)
    }

    return;
  }

  async findMyPersonal() {
    let resPersonalInfo = await this
      .supabaseRemote
      .client
      .from('student')
      .select("personal_id")
      .eq('profile_id', this.session?.user?.id)
      .single()

    if (resPersonalInfo.data != null && resPersonalInfo.data?.personal_id != null) {
      let res = await this.supabaseRemote.client
        .from("personal")
        .select("profile_id,license, profile!inner(name,gender,city,state,birth_date,phone)")
        .eq('profile_id', resPersonalInfo.data?.personal_id)

      return res.data;
    }

    return ''
  }

  async findAllTrainingPlan() {
    let res = await this.supabaseRemote.client
      .from('training_plan')
      .select('id, day_of_week, exercicies!inner(*)')
      .eq('student_id', this.session?.user?.id)

    return res.data;
  }

  async findOneTrainingPlan(dayOfWeek: string) {
    let res = await this.supabaseRemote.client
      .from('training_plan')
      .select('id, day_of_week, exercicies!inner(*)')
      .eq('student_id', this.session?.user?.id)
      .eq('day_of_week', dayOfWeek).single()

    return res.data;
  }
}
