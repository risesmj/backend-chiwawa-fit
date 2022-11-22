import { Injectable } from "@nestjs/common";
import { User } from "@supabase/supabase-js";

@Injectable()
export class SessionCurrent {
    public user: User | null;
}