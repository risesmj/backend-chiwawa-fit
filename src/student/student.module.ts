import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { CoreModule } from 'src/core/core.module';
import { SupabaseRemote } from 'src/core/supabase-remote';

@Module({
  imports: [
    CoreModule,
  ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule { }
