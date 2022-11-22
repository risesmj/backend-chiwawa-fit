import { Module } from '@nestjs/common';
import { SessionCurrent } from './session_current';
import { SupabaseRemote } from './supabase-remote';

@Module({
    providers: [
        SupabaseRemote,
        SessionCurrent
    ],
    exports: [
        SupabaseRemote,
        SessionCurrent
    ],

})
export class CoreModule { }
