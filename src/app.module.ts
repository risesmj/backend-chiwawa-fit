import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PersonalModule } from './personal/personal.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [AuthModule, PersonalModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
