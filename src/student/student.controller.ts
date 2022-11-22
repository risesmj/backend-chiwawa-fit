import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { StudentService } from './student.service';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Get('fetch-new-personal')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Busca um personal trainer adequado para o usuário" })
  fetchNewPersonal() {
    return this.studentService.fetchNewPersonal();
  }

  @Post('request-personal')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Envia um solicitação para o personal escolhido" })
  rquestNewPersonal(@Query('personal_id') personalId: string) {
    return this.studentService.rquestNewPersonal(personalId);
  }

  @Get('my-personal')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Retorna o personal trainer atual do aluno" })
  findMyPersonal() {
    return this.studentService.findMyPersonal();
  }

  @Get('training-plan/all')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Retorna o plano de treino de todos os dias da semana do aluno" })
  findAllTrainingPlan() {
    return this.studentService.findAllTrainingPlan();
  }

  @Get('training-plan/:dayOfWeek')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Retorna o plano de treino de um dia específico da semana" })
  findOneTrainingPlan(@Param('dayOfWeek') dayOfWeek: string) {
    return this.studentService.findOneTrainingPlan(dayOfWeek);
  }
}
