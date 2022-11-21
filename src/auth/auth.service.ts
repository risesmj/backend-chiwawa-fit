import { Injectable } from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpProfile } from './dto/signup-profile';

@Injectable()
export class AuthService {

  signIn(signInAuthDto: SignInAuthDto) {

  }

  signUp(signUp: SignUpProfile) {

  }
}
