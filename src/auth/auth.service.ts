import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { SupabaseRemote } from 'src/core/supabase-remote';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpPersonalDto } from './dto/signup-personal.dto';
import { SignUpStudentDto } from './dto/signup-student.dto';

@Injectable()
export class AuthService {
  constructor(private remote: SupabaseRemote) { }

  async signIn(signInAuthDto: SignInAuthDto) {
    var res = await this.remote
      .client
      .auth
      .signInWithPassword({
        email: signInAuthDto.login,
        password: signInAuthDto.password
      })

    if (res.error?.message.length > 0) {
      throw new UnauthorizedException("Usuário ou senha inválidos.");
    }

    return {
      access_token: res.data.session.access_token,
      token_type: res.data.session.token_type,
      expires_in: res.data.session.expires_in,
      refresh_token: res.data.session.refresh_token
    };
  }

  async signUpStudent(signUp: SignUpStudentDto) {
    var error = "";

    //create user authentication
    let res = await this.remote.client.auth.signUp({ email: signUp.email, password: signUp.password })

    if (res.data.user != null) {
      //get id user
      let profile_id = res.data.user.id;

      //create information profile
      var resProfile = await this.remote.client.from('profile')
        .insert({ name: signUp.name, users_id: profile_id });

      resProfile = await this.remote.client.from('profile').select().eq('users_id', profile_id);

      if (resProfile.data != null) {

        //create profile student
        var resStudent = await this.remote.client.from('student')
          .insert({ profile_id: profile_id });

        resStudent = await this.remote.client.from('student').select().eq('profile_id', profile_id);

        if (resStudent.data != null) {
          return { 'statusCode': 201, 'message': 'Conta criada com sucesso, verifique o link de ativação no seu e-mail.' }
        } else {
          error = resStudent.error.message;
        }
      } else {
        error = resProfile.error.message;
      }
    } else {
      error = res.error.message;
    }


    throw new BadRequestException(error);
  }

  async signUpPersonal(signUp: SignUpPersonalDto) {
    var error = "";

    //create user authentication
    let res = await this.remote.client.auth.signUp({ email: signUp.email, password: signUp.password })

    if (res.data.user != null) {
      //get id user
      let profile_id = res.data.user.id;

      //create information profile
      var resProfile = await this.remote.client.from('profile')
        .insert({
          name: signUp.name,
          city: signUp.city,
          state: signUp.state,
          users_id: profile_id
        });

      resProfile = await this.remote.client.from('profile').select().eq('users_id', profile_id);

      if (resProfile.data != null) {

        //create profile student
        var resStudent = await this.remote.client.from('personal')
          .insert({
            profile_id: profile_id,
            license: signUp.license,
          });

        resStudent = await this.remote.client.from('personal').select().eq('profile_id', profile_id);

        if (resStudent.data != null) {
          return { 'statusCode': 201, 'message': 'Conta criada com sucesso, verifique o link de ativação no seu e-mail.' }
        } else {
          error = resStudent.error?.message;
        }
      } else {
        error = resProfile.error?.message;
      }

    } else {
      error = res.error?.message;
    }


    throw new BadRequestException(error);
  }
}
