import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PersonalService {
  findAllStudents() {
    return `This action returns all personal`;
  }

  findOneStudents(id: string) {
    return `This action returns a #${id} personal`;
  }

  createPlan(idStudent: string, createPlanDto: CreatePlanDto) {
  }

  updatePlan(
    idStudent: string,
    idTrainingPlan: string,
    updatePlanDto: UpdatePlanDto
  ) {
    return ``;
  }

  removePlan(idStudent: string, idTrainingPlan: string) {
    return ``;
  }
}
