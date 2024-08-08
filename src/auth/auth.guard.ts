import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import getParams from '../../config/config.parameters';

@Injectable()
export class AuthGuard implements CanActivate {
  private params = getParams();

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token: string | undefined = this.extractTokenFromHeader(request);
    console.log('=>(auth.guard.ts:20) S', token);

    if (!token) {
      console.log(1);
      throw new UnauthorizedException();
    }

    try {
      console.log(2);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.params.jwtSecret,
      });
      // console.log('=>(auth.guard.ts:29) payload', payload);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // request['user'] = payload;
    } catch (e) {
      console.log('3333333333333333333', e);
      console.log(3);
      throw new UnauthorizedException(e.message);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
