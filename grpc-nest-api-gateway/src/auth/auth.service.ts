import { Injectable, Inject } from '@nestjs/common';
import { AUTH_SERVICE_NAME, AuthServiceClient } from './auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { ValidateResponse } from './auth.pb';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public validate(token: string): Promise<ValidateResponse> {
    return firstValueFrom(this.svc.validate({ token }));
  }
}
