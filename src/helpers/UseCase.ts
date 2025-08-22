
export abstract class UseCase<T, P> {
  abstract call(p: P): Promise<T>;
}
