import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
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

  @Get('requests')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Retorna as solicitações pendentes de novos alunos" })
  findRequests() {
    return this.personalService.findRequests();
  }

  @Patch('requests/:idRequest')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Aceita ou rejeita o aluno atualizando o status da solicitação, envie accepted ou rejected no query params" })
  acceptOrRejectRequest(@Param('idRequest') id: string, @Query('status') status: string) {
    return this.personalService.acceptOrRejectRequest(id, status);
  }

  @Post('my-students/:idStudent/training-plan')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Cria o plano de treino de um aluno específico conforme idStudent" })
  createPlan(@Param('idStudent') idStudent: string, @Body() createPlanDto: CreatePlanDto) {
    return this.personalService.createPlan(idStudent, createPlanDto);
  }
}
