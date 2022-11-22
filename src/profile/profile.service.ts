import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { SessionCurrent } from 'src/core/session_current';
import { SupabaseRemote } from 'src/core/supabase-remote';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {

  constructor(
    private remote: SupabaseRemote,
    private session: SessionCurrent
  ) { }

  async findOne() {
    let resStudent = await this.remote.client
      .from("student")
      .select("profile_id, height, weight, profile!inner(name,gender,city,state,birth_date,phone)")
      .eq('profile_id', this.session?.user?.id)
      .single()

    if (resStudent.data != null) {
      return resStudent.data;
    }

    let resPersonal = await this.remote.client
      .from("personal")
      .select("profile_id,license, profile!inner(name,gender,city,state,birth_date,phone)")
      .eq('profile_id', this.session?.user?.id)
      .single()

    if (resPersonal.data != null) {
      return resPersonal.data;
    }

    throw new BadRequestException('Perfil de usuário não identificado.');
  }

  async update(updateProfileDto: UpdateProfileDto) {
    var profile = null;
    var isStudent = false;

    let resStudent = await this.remote.client
      .from("student")
      .select()
      .eq('profile_id', this.session?.user?.id)
      .single()

    if (resStudent.data != null) {
      isStudent = true;

      profile = updateProfileDto?.profile;

      if (updateProfileDto?.height != null || updateProfileDto?.weight != null) {
        await this.remote.client.from('student')
          .update({
            height: updateProfileDto?.height != null ? updateProfileDto?.height : resStudent.data.height,
            weight: updateProfileDto?.weight != null ? updateProfileDto?.weight : resStudent.data.weight
          })
          .eq('profile_id', this.session?.user?.id)
      }
    }

    if (!isStudent) {
      let resPersonal = await this.remote.client
        .from("personal")
        .select()
        .eq('profile_id', this.session?.user?.id)
        .single()

      if (resPersonal.data != null) {

        profile = updateProfileDto?.profile;

        if (updateProfileDto?.license != null) {
          await this.remote.client.from('personal')
            .update({
              license: updateProfileDto?.license
            })
            .eq('profile_id', this.session?.user?.id)
        }
      }
    }

    if (profile != null) {

      let resProfile = await this.remote.client
        .from("profile")
        .select()
        .eq('users_id', this.session?.user?.id)
        .single()

      if (resProfile?.data != null) {
        await this.remote.client.from('profile')
          .update({
            name: profile?.name != null ? profile?.name : resProfile.data.name,
            gender: profile?.gender != null ? profile?.gender : resProfile.data.gender,
            city: profile?.city != null ? profile?.city : resProfile.data.city,
            state: profile?.state != null ? profile?.state : resProfile.data.state,
            birth_date: profile?.birth_date != null ? profile?.birth_date : resProfile.data.birth_date,
            phone: profile?.phone != null ? profile?.phone : resProfile.data.phone
          })
          .eq('users_id', this.session?.user?.id)
      }
    }

  }
}
