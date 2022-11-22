import { Inject, Injectable } from '@nestjs/common';
import { SupabaseRemote } from 'src/core/supabase-remote';

@Injectable()
export class StudentService {

  constructor(private supabaseRemote: SupabaseRemote) { }

  fetchNewPersonal() {
    return '';
  }

  findMyPersonal() {
    return '';
  }

  async findAllTrainingPlan() {
    let teste = await this.supabaseRemote.client.from('training_plan').select()
    console.log(teste);
  }

  findOneTrainingPlan(id: string) {
    return `This action returns a #${id} student`;
  }
}
