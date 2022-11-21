import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Get('fetch-new-personal')
  @ApiOperation({ summary: "Busca um personal trainer adequado para o usuário" })
  fetchNewPersonal() {
    return this.studentService.fetchNewPersonal();
  }


  @Get('my-personal')
  @ApiOperation({ summary: "Retorna o personal trainer atual do aluno" })
  findMyPersonal() {
    return this.studentService.findMyPersonal();
  }

  @Get('training-plan/all')
  @ApiOperation({ summary: "Retorna o plano de treino de todos os dias da semana do aluno" })
  findAllTrainingPlan() {
    return this.studentService.findAllTrainingPlan();
  }

  @Get('training-plan/:dayOfWeek')
  @ApiOperation({ summary: "Retorna o plano de treino de um dia específico da semana" })
  findOneTrainingPlan(@Param('dayOfWeek') id: string) {
    return this.studentService.findOneTrainingPlan(id);
  }
}
