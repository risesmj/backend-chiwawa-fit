import { Module } from '@nestjs/common';
import { SupabaseRemote } from './supabase-remote';

@Module({
    providers: [
        SupabaseRemote
    ],
    exports: [
        SupabaseRemote
    ],

})
export class CoreModule { }
