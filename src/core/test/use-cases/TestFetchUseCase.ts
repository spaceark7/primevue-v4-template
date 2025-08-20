import type { UseCase } from "@/helpers/UseCase";
import type { TestEntity } from "../TestEntity";
import type { TestRepository } from "../TestRepository";
import type { Either } from "@/helpers/Either";
import type { IFailure } from "@/types/Failure";

export class TestFetchUseCase implements UseCase<TestEntity, any> {
  constructor(private testRepository: TestRepository) {}

  async call(params?: any): Promise<Either<IFailure, TestEntity>> {
    return this.testRepository.fetchTest(params);
  }
}
