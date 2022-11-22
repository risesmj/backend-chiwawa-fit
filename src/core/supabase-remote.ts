import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseRemote {
    client: SupabaseClient;

    constructor() {
        this.client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    }

}