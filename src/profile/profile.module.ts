import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule { }
