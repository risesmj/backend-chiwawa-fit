import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
