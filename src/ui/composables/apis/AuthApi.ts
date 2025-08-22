import type { LoginRequest } from "@/core/auth/AuthEntity";
import { loginUseCase } from "@/infrastructure/containers/AuthContainer";
import { useAppAuthStore } from "@/stores/AppAuthStore";
import { useMutation } from "@tanstack/vue-query";

const useAuthApi = () => {
  const appAuthStore = useAppAuthStore();
  const login = useMutation({
    mutationFn: (request: LoginRequest) => loginUseCase.call(request),
    onSuccess: (data) => {
      console.log('Login successful:', data);
      appAuthStore.setState(data);
    },
    retry: 0
  })

  const logout = async () => {
    // Call your logout API here
  };

  return {
    login,
    logout
  };
};

export default useAuthApi;
