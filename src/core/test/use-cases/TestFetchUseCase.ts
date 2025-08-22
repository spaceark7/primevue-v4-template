import type { UseCase } from "@/helpers/UseCase";
import type { TestEntity } from "../TestEntity";
import type { TestRepository } from "../TestRepository";

export class TestFetchUseCase implements UseCase<TestEntity, any> {
  constructor(private testRepository: TestRepository) {}

  async call(params?: any): Promise<TestEntity> {
    return this.testRepository.fetchTest(params);
  }
}
