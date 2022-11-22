import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionCurrent } from 'src/core/session_current';
import { SupabaseRemote } from 'src/core/supabase-remote';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private remote: SupabaseRemote,
        private session: SessionCurrent
    ) { }

    canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        return this.validateRequest(context)
    }

    async validateRequest(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        var canContinue = false;

        let token = request.headers["authorization"]?.replaceAll("Bearer", "")?.trim();

        try {
            if (token == null || token == undefined || token.length == 0) {
                throw new UnauthorizedException();
            }
        } catch (_) {
            throw new UnauthorizedException();
        }

        let res = await this.remote.client.auth.getUser(token)

        if (res.data.user != null) {
            canContinue = true;
            this.session.user = res.data?.user;
        } else {
            throw new UnauthorizedException();
        }

        return canContinue;
    }
}