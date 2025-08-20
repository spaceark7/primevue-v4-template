import type { LoginRequest, LoginResponse } from "../AuthEntity";
import type { AuthRepository } from "../AuthRepository";


export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async call(request: LoginRequest): Promise<LoginResponse> {
    return this.authRepository.login(request);
  }
}
