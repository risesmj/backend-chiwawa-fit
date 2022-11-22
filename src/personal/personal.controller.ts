import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PersonalService } from './personal.service';

@ApiTags('Personal Trainer')
@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) { }


  @Get('my-students')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Retorna todos os alunos do personal trainer" })
  findAllStudents() {
    return this.personalService.findAllStudents();
  }


  @Get('my-students/:idStudent')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Retorna o detalhes de um aluno específico conforme idStudent" })
  findOneStudents(@Param('idStudent') id: string) {
    return this.personalService.findOneStudents(id);
  }


  @Post('my-students/:idStudent/training-plan')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Cria o plano de treino de um aluno específico conforme idStudent" })
  createPlan(@Param('idStudent') idStudent: string, @Body() createPlanDto: CreatePlanDto) {
    return this.personalService.createPlan(idStudent, createPlanDto);
  }
}
