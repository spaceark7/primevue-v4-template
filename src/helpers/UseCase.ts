import type { ResponseDTO } from '@/types/ResponseDTO';

export abstract class UseCase<T, P> {
  abstract call(p: P): Promise<ResponseDTO<T>>;
}
