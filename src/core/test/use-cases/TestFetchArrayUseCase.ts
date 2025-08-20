import { UseCase } from "@/helpers/UseCase";
import type { ResponseDTO } from "@/types/ResponseDTO";
import type { TestArrayEntity } from "../TestEntity";
import type { TestRepository } from "../TestRepository";

export class TestFetchArrayUseCase implements UseCase<TestArrayEntity[], any> {
  constructor(private testRepository: TestRepository) {}

  async call(params?: any): Promise<ResponseDTO<TestArrayEntity[]>> {
    return this.testRepository.fetchTestArray(params);
  }
}

