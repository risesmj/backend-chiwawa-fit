import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PersonalService } from './personal.service';

@ApiTags('Personal Trainer')
@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) { }


  @Get('my-students')
  @ApiOperation({ summary: "Retorna todos os alunos do personal trainer" })
  findAllStudents() {
    return this.personalService.findAllStudents();
  }


  @Get('my-students/:idStudent')
  @ApiOperation({ summary: "Retorna o detalhes de um aluno específico conforme idStudent" })
  findOneStudents(@Param('idStudent') id: string) {
    return this.personalService.findOneStudents(id);
  }


  @Post('my-students/:idStudent/training-plan')
  @ApiOperation({ summary: "Retorna o plano de treino de um aluno específico conforme idStudent" })
  createPlan(@Param('idStudent') idStudent: string, @Body() createPlanDto: CreatePlanDto) {
    return this.personalService.createPlan(idStudent, createPlanDto);
  }


  @Patch('my-students/:idStudent/training-plan/:idTrainingPlan')
  @ApiOperation({ summary: "Atualiza o plano de treino de um aluno específico conforme idStudent e idTrainingPlan" })
  updatePlan(
    @Param('idStudent') idStudent: string,
    @Param('idTrainingPlan') idTrainingPlan: string,
    @Body() updatePlanDto: UpdatePlanDto
  ) {
    return this.personalService.updatePlan(idStudent, idTrainingPlan, updatePlanDto);
  }


  @Delete('my-students/:idStudent/training-plan/:idTrainingPlan')
  @ApiOperation({ summary: "Deleta o plano de treino de um aluno específico conforme idStudent e idTrainingPlan" })
  removePlan(
    @Param('idStudent') idStudent: string,
    @Param('idTrainingPlan') idTrainingPlan: string
  ) {
    return this.personalService.removePlan(idStudent, idTrainingPlan);
  }
}
