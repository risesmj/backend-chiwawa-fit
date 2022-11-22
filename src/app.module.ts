import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient';
import process from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SupabaseRemote } from './core/supabase-remote';
import { PersonalModule } from './personal/personal.module';
import { StudentModule } from './student/student.module';
import { CoreModule } from './core/core.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    PersonalModule,
    StudentModule,
    ConfigModule.forRoot(),
    ProfileModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
