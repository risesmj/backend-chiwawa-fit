import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpPersonalDto } from './dto/signup-personal.dto';
import { SignUpStudentDto } from './dto/signup-student.dto';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  @ApiOperation({ summary: "Login" })
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signIn(signInAuthDto);
  }

  @Post('signup/student')
  @ApiOperation({ summary: "Criar conta de aluno" })
  signUpStudent(@Body() signUpAuthDto: SignUpStudentDto) {
    return this.authService.signUp(signUpAuthDto);
  }

  @Post('signup/personal')
  @ApiOperation({ summary: "Criar conta de personal trainer" })
  signUpPersonal(@Body() signUpAuthDto: SignUpPersonalDto) {
    return this.authService.signUp(signUpAuthDto);
  }
}
