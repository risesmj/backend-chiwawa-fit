import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule
  ],
  controllers: [PersonalController],
  providers: [PersonalService]
})
export class PersonalModule { }
