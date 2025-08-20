import { LoginUseCase } from "@/core/auth/use-cases/LoginUseCase";
import { authRepository } from "../services/repositories/AuthRepositoryImpl";

const loginUseCase = new LoginUseCase(authRepository);

export {
  loginUseCase
}