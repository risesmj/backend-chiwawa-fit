import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {

  fetchNewPersonal() {
    return '';
  }

  findMyPersonal() {
    return '';
  }

  findAllTrainingPlan() {
    return `This action returns all student`;
  }

  findOneTrainingPlan(id: string) {
    return `This action returns a #${id} student`;
  }
}
